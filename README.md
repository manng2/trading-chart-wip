## Demo
You can view the demo [here](https://fancy-biscuit-d67854.netlify.app/).

## Tech stacks

- Frontend: Angular 16, Angular Material, Sass
- Backend: NestJs
- Database: MongoDB
- Deployment: Netlify, Cyclic

![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)

![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)

![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

## Deployment

**Frontend Application Deployment:**

1. Developers push code changes to the Git repository.
2. **Netlify** detects changes in the master branch and triggers a build job.
3. **Netlify** builds the **Angular** application and deploys it to the production environment.

**Backend Application Deployment:**

1. Developers push code changes to the Git repository.
2. **Cyclic** detects changes in the `master` branch and triggers a build job.
3. **Cyclic** builds the **Nestjs** application and deploys it to the `production` environment.
4. **Cyclic** applies environment variables configured on **Cyclic** to the production environment.

**Database Deployment:**

- Utilize **MongoDB Atlas** as Cloud Database Service

**Environments:**

- Development Environment: Used for development and testing.
- Production Environment: Used for actual user access.

**Pipelines:**

- Frontend Build Pipeline: Builds and deploys the frontend application to **Netlify**.
- Backend Build Pipeline: Builds and deploys the backend application to **Cyclic**.

**Benefits of this approach:**

- Automated deployments: Code changes are automatically deployed to production, reducing manual intervention and errors.
- Environment separation: Development and production environments are separated, preventing accidental deployments to production.
- Environment-specific configurations: Environment variables can be configured differently for development and production environments.

## Solution

**Frontend development**

- Embrace the latest **Angular version 16** and leverage its cutting-edge features like **signals**, **standalone components**, and **functional guards** for enhanced development efficiency.

- Implement **interceptors** to seamlessly modify HTTP requests and adapt them to specific application needs.

- Employ **guards** to safeguard routes and enforce access control, ensuring that unauthorized users cannot access restricted areas of the application.

- Utilize **reactive forms** to handle complex form data management.

- Adopt **change detection on push** to optimize performance by minimizing unnecessary change detection cycles and enhancing application responsiveness.

- Adhere to **Angular best practices and coding conventions** to maintain a consistent, well-structured, and maintainable codebase.

**Backend development**

- Leverage **Dependency Injection** to inject dependencies into services, controllers, and other components, fostering a modular and testable codebase.

- Adopt a modular architecture by **structuring NestJS application into distinct modules**, each encapsulating a specific business domain or feature.

- Utilize **NestJS exception filters** to intercept errors, and provide meaningful error responses to clients.

## Limitation

1. Missing JWT implementation
2. Missing unit tests
