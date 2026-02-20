from django.core.management.base import BaseCommand
from django.db import connection
from django.db.utils import OperationalError

class Command(BaseCommand):
    help = "Check PostgreSQL database connection"

    def handle(self, *args, **kwargs):
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1;")
            self.stdout.write(self.style.SUCCESS("✅ Database connected successfully"))
        except OperationalError:
            self.stdout.write(self.style.ERROR("❌ Database connection failed"))