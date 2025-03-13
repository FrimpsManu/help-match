# Help Match
Help Match is a Django-based web application designed to connect users who need help with those who can provide assistance. The application leverages the OpenAI API to extract relevant information from user-provided descriptions and matches them with appropriate helpers in help channels.


## Video Demo
[![Help Match Demo](https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/204/730/datas/original.png)](https://youtu.be/_G9-ufi3sHE)


## Features

- **User Authentication**: Users can sign up, log in, and log out using Django Allauth.
- **Help Matching**: Users can describe their help needs, and the application will match them with the appropriate channel, role, and specific help details.
- **Chat Functionality**: Real-time chat functionality using Django Channels and WebSockets.
- **Game Interaction**: Users can interact in a game-like environment to facilitate help and collaboration.
- **AI Integration**: Utilizes OpenAI's GPT-3.5 API to extract information from user descriptions.

## Installation (if you want to extend/contribute)

1. **Clone the repository**:
    ```sh
    git clone <repository-url>
    cd help-match
    ```

2. **Create and activate a virtual environment**:
    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. **Install the dependencies**:
    ```sh
    pip install -r requirements.txt
    ```

4. **Set up environment variables**:
    Create a [`.env`](.env ) file in the root directory and add the following:
    ```
    OPENAI_API_KEY=<your-openai-api-key>
    DJANGO_SECRET_KEY=<your-django-secret-key>
    EMAIL_HOST_USER=<your-email>
    EMAIL_HOST_PASSWORD=<your-email-password>
    EMAIL_PORT=587
    REDISCLOUD_URL=redis://localhost:6379/
    ```

5. **Run migrations**:
    ```sh
    python manage.py makemigrations
    python manage.py migrate
    ```

6. **Start the development server**:
    ```sh
    python manage.py runserver
    ```


7. **You can also use simple commands in the `run` bash file**:
    ```sh
    E.g
    ./run -r
    ./run -m/M
    etc
    ```

## Usage

- **Sign Up/Login**: Create an account or log in using the provided authentication system.
- **Request Help**: Fill out the help form with your description and submit it.
- **Chat**: Use the chat interface to communicate with helpers.
- **Game Interaction**: Engage in the game environment to facilitate help and collaboration.
- **Bash Functions**: Use the bash functions provided via the `run` command.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements

- [Django](https://www.djangoproject.com/)
- [Django Channels](https://channels.readthedocs.io/en/stable/)
- [OpenAI](https://www.openai.com/)
- [Django Allauth](https://django-allauth.readthedocs.io/en/latest/)

---

Feel free to reach out if you have any questions or need further assistance.

<!-- Create an account at [helpmatch.io](https://helpmatch.io) to use the deployed, and maintained version of helpmatch. -->
Thank yoU!

