<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/mit-o/whazzapp">
    <img src="client/public/favicon/android-chrome-192x192.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Whazzapp - Real time Chat application</h3>

  <p align="center">
    Built in with DRF, Django Channels and Next.js!
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![App intro][app-intro]](https://github.com/mit-o/whazzapp)

Wazzapp is real time chat application based on Whatsapp and building it was giving and also is giving a lot things to learn and understand.

Features:

User registration and login
Sending messages on private and group conversations
Ability to edit user profile
Integration of backend with Firebase SDK for editing and storing user avatars in firebase storage
Ability to add and remove users from group conversations
In progress:

Adding message read status
Connecting SMTP for adding password reminder option
Listening to message writing
Pagination and message search
Tests and CI/CD

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![React][react.js]][react-url]
- [![Next][next.js]][next-url]
- [![Python][python]][python-url]
- [![Django][django]][django-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally. To get a local copy up and running follow these simple example steps.

### Prerequisites

First of all to start you will need to have docker with docker-compose on your machine.

### Installation

Below you can find necessary steps to run the app in development mode.

1. Clone the repo
   ```sh
   git clone https://github.com/mit-o/whazzapp.git
   ```
2. Change the name of the .env.example file to .env and fill the variables
3. Run the docker-compose file
   ```sh
   docker-compose up
   ```
4. Open the browser and go to http://localhost:3000

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: #
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/sebastian-tarczynski
[app-intro]: intro/app-intro.png
[next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[next-url]: https://nextjs.org/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[python]: https://img.shields.io/badge/Python-14354C?style=for-the-badge&logo=python&logoColor=white
[python-url]: https://www.python.org/
[django]: https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white
[django-url]: https://www.djangoproject.com/
