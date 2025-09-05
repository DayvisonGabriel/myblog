import os
import json

posts_dir = "Artigos"
file_list = []

for filename in sorted(os.listdir(posts_dir)):
    if filename.endswith(".json"):
        file_list.append(f"'{posts_dir}/{filename}'")

js_code = f"const postFiles = [{', '.join(file_list)}];"

with open("post-list.js", "w") as f:
    f.write(js_code)

print("post-list.js gerado com sucesso!")