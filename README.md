# FUT-SPRING

### **Unite, Play, Conquer: Elevate Your Football Experience with Robust Java Backend**

![Last Commit](https://img.shields.io/github/last-commit/Guga2111/fut-spring) ![Java Language](https://img.shields.io/badge/language-Java-blue) ![SpringBoot](https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white) ![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=spring-security&logoColor=white) ![JPA](https://img.shields.io/badge/JPA-orange?style=for-the-badge) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

Built with the tools and technologies:

![JSON](https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=json&logoColor=white) ![Markdown](https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white) ![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) ![XML](https://img.shields.io/badge/XML-106590?style=for-the-badge&logo=xml&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

## Table of Contents

* [Overview](#overview)
* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
    * [Usage](#usage)
    * [Testing](#testing)

## Overview

`fut-spring` is an all-in-one football match system tailored for casual "peladas" and local football communities. It simplifies match scheduling, player management, and game tracking, enabling seamless coordination and engagement.

### Why fut-spring?

This project provides a scalable and maintainable architecture combining a Spring Boot backend with a React-based frontend. The core features include:

* **Match Scheduling & Management:** Automate daily game setup and organize tournaments effortlessly.
* **Player & Team Management:** Easily add, update, and organize players and teams.
* **Real-Time Chat & Communication:** Foster collaboration with integrated messaging during matches.
* **Ranking & Analytics:** Track player stats, rankings, and achievements with dynamic visualizations.
* **Secure Authentication:** JWT-based user login and profile management for a safe experience, powered by **Spring Security**.
* **Modular & Responsive UI:** Reusable components and modern build tools for scalable development.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

* **Java Development Kit (JDK) 17 or higher**
* **Maven** (for building the Spring Boot backend)
* **Node.js** (for the React frontend)
* **npm** or **Yarn** (Node.js package manager)
* **PostgreSQL** (or another compatible database for JPA)

### Installation

Build `fut-spring` from the source and install dependencies:

1.  Clone the repository:

    ```bash
    git clone [https://github.com/Guga2111/fut-spring](https://github.com/Guga2111/fut-spring)
    ```

2.  Navigate to the project directory:

    ```bash
    cd fut-spring
    ```

3.  Install the backend dependencies and build the project (from the `fut-spring` root directory):

    ```bash
    cd backend
    mvn clean install
    ```

4.  Install the frontend dependencies (from the `fut-spring` root directory):

    ```bash
    cd frontend
    npm install
    # or yarn install
    ```

### Usage

To run the `fut-spring` application locally:

1.  **Start the PostgreSQL database:** Ensure your PostgreSQL instance is running and configured correctly. Update `src/main/resources/application.properties` in the `backend` directory with your database credentials.

2.  **Run the Spring Boot backend:**

    ```bash
    cd backend
    mvn spring-boot:run
    # or mvn clean spring-boot:run
    ```

    The backend will typically run on `http://localhost:8080`.

3.  **Run the React frontend:**

    ```bash
    cd frontend
    npm run dev
    # or yarn start
    ```

    The frontend will typically open in your browser at `http://localhost:3000`.

### Testing

Instructions on how to run tests for the project.

#### Backend Tests

To run the unit and integration tests for the Spring Boot backend:

```bash
cd backend
mvn test
