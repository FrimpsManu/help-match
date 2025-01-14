release: python manage.py makemigrations && python manage.py migrate
web: python -m gunicorn help_match.asgi:application -k uvicorn.workers.UvicornWorker