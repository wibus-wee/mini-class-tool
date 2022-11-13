rm -rf public/screen_macos_desktop_dark.jpg
rm -rf public/screen_macos_desktop_light.jpg

# only web
sed -i '' '/\/\*\* only web \*\*\//d' src/main.css
# only app
echo '\n \n /** only app **/ .header { margin-top: 25px; }' >> src/main.css


pnpm build