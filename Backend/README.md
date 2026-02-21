//Model changes
python manage.py makemigrations
python manage.py migrate

//check database connected
python manage.py checkdb

//venv setup
python -m venv venv
source venv/Scripts/activate //gitbash
venv/Scripts/activate //cmd

//run backend
python manage.py runserver

//installation
pip install psycopg2-binary python-dotenv django-cors-headers
