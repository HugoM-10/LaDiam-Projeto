import os
from datetime import datetime
from django.utils.text import slugify  # Ensures safe filenames

def product_image_upload_path(instance, filename):
    # Extract extension
    ext = os.path.splitext(filename)[1]

    # Get safe strings
    type_folder = slugify(instance.type)
    name_slug = slugify(instance.name)

    # Timestamp
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    # Final path
    filename = f"{name_slug}_{timestamp}{ext}"
    return os.path.join('products', type_folder, filename)
