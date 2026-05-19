# AGENT TASK — Build Portfolio Blog (Next.js + Sanity + Docker)

## ROLE

You are a senior full-stack engineer.

Your task is to generate a production-ready developer portfolio blog with an integrated CMS.

The CMS must be easy for non-technical users to write blog posts.

The system must run locally and deploy to a Linux server using Docker and Nginx.

---

# PROJECT STACK

Frontend:
Next.js (App Router)
TypeScript
TailwindCSS

CMS:
Sanity (embedded studio)

Infrastructure:
Docker
Docker Compose
Nginx reverse proxy

---

# PROJECT GOALS

Create a website with:

Landing page
Blog section
Blog article page
Projects section
Embedded CMS

The CMS must be accessible at:

/studio

Example:

example.com → website
example.com/studio → CMS

---

# REPOSITORY STRUCTURE

Create the following project structure.

portfolio-site/

frontend/

app/
components/
lib/
sanity/

content/

deploy/

docker-compose.yml
.env.example
README.md

---

# NEXT.JS SETUP

Initialize Next.js:

npx create-next-app@latest frontend

Configuration:

TypeScript = yes
TailwindCSS = yes
App Router = yes
ESLint = yes


---

# LANDING PAGE

Landing page should contain:

see index.html and take decisions how to represent it

---


# PROJECTS SECTION

Projects page should show:

project cards
description
tech stack

Project detail page should display:

title
description
links

check 
see index.html and take decision how to represent it

---

# SANITY SETUP

Sanity must be integrated inside the Next.js app.

Create directory:

frontend/sanity

Initialize Sanity Studio.

Sanity must run inside the same project.

Studio route:

/studio

---

# SANITY SCHEMAS


see index.html and take decisions about schemas

---

# SANITY CLIENT

Create:

frontend/lib/sanity.ts

Client must read env variables:

NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET

---

# TAILWIND DESIGN

Use TailwindCSS.

Add typography plugin.

Design requirements:

minimal developer portfolio
clean typography
responsive layout
neutral colors

---

# DOCKER SETUP

Create Docker configuration.

Services:

frontend
nginx

Sanity runs inside the Next.js project.

---

# DOCKERFILE

Create Dockerfile for frontend.

Use:

node:18-alpine

Steps:

install dependencies
build nextjs app
start production server

Expose port:

3000

---

# NGINX SETUP

Create nginx configuration.

Nginx must proxy requests to the Next.js container.

Example:

location / {
proxy_pass http://frontend:3000;
}

---

# DOCKER COMPOSE

docker-compose.yml must start:

frontend container
nginx container

Ports:

80 → nginx
3000 → frontend

---

# ENVIRONMENT VARIABLES

Create:

.env.example

NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production

---

# LOCAL DEVELOPMENT

Project must run locally with:

npm run dev

or

docker compose up

Access:

http://localhost → website
http://localhost/studio → CMS

---

# LINUX DEPLOYMENT

Deployment steps must be documented.

Example:

git clone repo

cd portfolio-site

docker compose up -d --build

The site must run behind nginx.

---

# SUCCESS CRITERIA

The project is successful if:

The website loads at localhost.

The CMS loads at:

/studio

A blog post created in CMS appears on the blog page.

Docker deployment works on Linux VPS.

---

# OUTPUT REQUIREMENTS

The agent must generate:

complete folder structure
Next.js code
Sanity schemas
Sanity configuration
Docker configuration
nginx configuration
README with setup instructions
