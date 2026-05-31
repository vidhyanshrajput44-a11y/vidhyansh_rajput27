# Vidhyansh Rajput Portfolio

A Flask-based portfolio web application showcasing skills, projects, and achievements.

## Project Structure
This project is configured specifically for a Flask Web Service deployment on Render:

- `templates/index.html` - The main web page.
- `static/` - Contains CSS (`style.css`) and JavaScript (`script.js`).
- Root Directory - Contains all images directly, as well as `app.py` and `requirements.txt`.

## Local Development
To run the server locally:
```bash
pip install -r requirements.txt
python app.py
```
The application will run on port 10000.

## Deployment on Render
Deploy as a **Web Service** with the following settings:
- **Build Command:** `pip install -r requirements.txt`
- **Start Command:** `python app.py`

*Note: All images are kept in the root directory to maintain the exact requested asset structure.*
