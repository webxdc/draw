#!/usr/bin/env python3
import argparse
import os
import shutil
from io import StringIO

import htmlmin
import lesscpy
from jsmin import jsmin


def get_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="App Builder",
    )
    parser.add_argument(
        "-n",
        "--name",
        default=os.path.basename(os.path.dirname(os.path.abspath(__file__))),
        help="App package's base name",
    )

    return parser


if __name__ == "__main__":
    args = get_parser().parse_args()
    app_archive = f"{args.name}.xdc"
    files = []

    # CLEAN
    shutil.rmtree("build", ignore_errors=True)
    os.makedirs("build/js")
    os.makedirs("build/css")
    if os.path.exists(app_archive):
        os.remove(app_archive)

    # ADD JS
    files.extend([
        "js/zepto.min.js",
        "js/drawingboard.min.js"
    ])
    with open("js/index.js") as file:
        script = jsmin(file.read()).replace("\n", ";")
    with open("build/js/index.js", "w") as file:
        file.write(script)

    # ADD CSS
    files.append("css/drawingboard.min.css")
    with open("css/style.css") as file:
        css = lesscpy.compile(file, minify=True, xminify=True)
        with open("build/css/style.css", "w") as file:
            file.write(css)

    # ADD HTML
    with open("index.html") as file:
        html = htmlmin.minify(file.read())
    with open("build/index.html", "w") as file:
        file.write(html)

    # ADD METADATA
    files.append("manifest.toml")
    files.append("icon.png")

    for path in files:
        shutil.copyfile(f"{path}", f"build/{path}")
    project_root = os.path.abspath(".")
    os.chdir("build")
    shutil.make_archive(f"{project_root}/{app_archive}", "zip")
    os.chdir(project_root)
    os.rename(f"{app_archive}.zip", app_archive)
    shutil.copyfile("webxdc.js", "build/webxdc.js")

    print(f"App saved as: {app_archive}")
