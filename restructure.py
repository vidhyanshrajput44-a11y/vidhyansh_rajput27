import os
import shutil

def main():
    # Directories
    templates_dir = "templates"
    static_dir = "static"
    public_images_dir = os.path.join("public", "images")
    
    os.makedirs(templates_dir, exist_ok=True)
    os.makedirs(static_dir, exist_ok=True)
    
    # 1. Move images to root
    if os.path.exists(public_images_dir):
        for f in os.listdir(public_images_dir):
            src = os.path.join(public_images_dir, f)
            dst = os.path.join(".", f)
            if os.path.isfile(src):
                shutil.move(src, dst)
        
    # Remove public folder
    if os.path.exists("public"):
        shutil.rmtree("public")
        
    # 2. Move index.html to templates/
    if os.path.exists("index.html"):
        shutil.move("index.html", os.path.join(templates_dir, "index.html"))
        
    # 3. Move css and js to static/
    if os.path.exists("style.css"):
        shutil.move("style.css", os.path.join(static_dir, "style.css"))
    if os.path.exists("script.js"):
        shutil.move("script.js", os.path.join(static_dir, "script.js"))

    print("Restructuring complete.")

if __name__ == "__main__":
    main()
