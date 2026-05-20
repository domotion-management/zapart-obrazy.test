import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { createClient } from 'next-sanity'

export async function POST(req: Request) {
  try {
    const { name, email, subject, message, consent } = await req.json()

    // 1. Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Wszystkie wymagane pola muszą być uzupełnione.' },
        { status: 400 }
      )
    }

    if (!consent) {
      return NextResponse.json(
        { error: 'Musisz zaakceptować politykę prywatności.' },
        { status: 400 }
      )
    }

    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
    const writeToken = process.env.SANITY_WRITE_TOKEN

    // 2. Save submission to Sanity CMS if configured
    if (projectId && writeToken) {
      try {
        const writeClient = createClient({
          projectId,
          dataset,
          apiVersion: '2025-05-01',
          token: writeToken,
          useCdn: false,
        })

        await writeClient.create({
          _type: 'contactSubmission',
          name,
          email,
          subject,
          message,
          consent: !!consent,
          submittedAt: new Date().toISOString(),
        })
      } catch (sanityError) {
        console.error('Błąd zapisu w Sanity:', sanityError)
        // We continue trying to send the email even if Sanity write fails, but log the error.
      }
    } else {
      console.warn('Sanity Write Token lub Project ID nie jest skonfigurowany. Zapis do CMS został pominięty.')
    }

    // 3. Send email via SMTP if SMTP server configured
    const smtpHost = process.env.SMTP_HOST
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10)
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const smtpSecure = process.env.SMTP_SECURE === 'true'
    const receiverEmail = process.env.CONTACT_FORM_RECEIVER

    if (smtpHost && smtpUser && smtpPass && receiverEmail) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure, // true for port 465, false for other ports
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        tls: {
          rejectUnauthorized: false, // Avoid SSL verification errors on mismatched hostnames
        },
      })

      const mailOptions = {
        from: `"${name} (Formularz Kontaktowy)" <${smtpUser}>`, // Use SMTP User as the sender to avoid SPF issues, with client name in alias
        to: receiverEmail,
        replyTo: email, // Direct replies will go to the sender's actual email
        subject: `[Portfolio Kontakt] ${subject}`,
        text: `Nowa wiadomość z formularza kontaktowego portfolio:

Imię i nazwisko: ${name}
E-mail: ${email}
Temat: ${subject}
Zgoda marketingowa/RODO: ${consent ? 'TAK' : 'NIE'}

Wiadomość:
------------------------------------------
${message}
------------------------------------------`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
            <h2 style="color: #C8963E; border-bottom: 2px solid #C8963E; padding-bottom: 10px;">Nowa wiadomość z formularza</h2>
            <p><strong>Imię i nazwisko:</strong> ${name}</p>
            <p><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Temat:</strong> ${subject}</p>
            <p><strong>Zgoda marketingowa/RODO:</strong> ${consent ? '<span style="color: green;">TAK</span>' : '<span style="color: red;">NIE</span>'}</p>
            <div style="background: #faf8f5; border-left: 4px solid #C8963E; padding: 15px; margin-top: 20px; font-style: italic;">
              ${message.replace(/\n/g, '<br />')}
            </div>
          </div>
        `,
      }

      await transporter.sendMail(mailOptions)
    } else {
      console.warn('Serwer SMTP lub adres odbiorcy nie jest skonfigurowany. Wysyłka e-mail pominięta.')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Błąd w API kontaktu:', error)
    return NextResponse.json(
      { error: 'Wystąpił wewnętrzny błąd podczas wysyłania wiadomości.' },
      { status: 500 }
    )
  }
}
