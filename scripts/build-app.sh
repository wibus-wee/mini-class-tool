rm -rf public/screen_macos_desktop_dark.jpg
rm -rf public/screen_macos_desktop_light.jpg

regex='--root-background: url\((.*)\);'
# 删除 '--root-background'
sed -i '' '/--root-background/d' src/main.css

pnpm build