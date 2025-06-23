# Create-Frontend-Structure.ps1

# 1. Root folder ka naam
$root = "frontend"

# 2. Sub-directories ki list (relative to $root)
$dirs = @(
    "public",
    "src",
    "src\api",
    "src\assets",
    "src\assets\images",
    "src\assets\styles",
    "src\components",
    "src\components\common",
    "src\components\layout",
    "src\constants",
    "src\features",
    "src\features\auth",
    "src\features\posts",
    "src\features",
    "src\hooks",
    "src\pages",
    "src\routes",
    "src\utils"
)

# 3. Text-based files ki list (relative to $root)
$files = @(
    "package.json",
    "package-lock.json",
    ".gitignore",
    "README.md",
    "public\index.html",
    "src\api\axiosInstance.js",
    "src\assets\styles\main.css",
    "src\components\common\Button.js",
    "src\components\common\Spinner.js",
    "src\components\common\Modal.js",
    "src\components\layout\Header.js",
    "src\components\layout\Footer.js",
    "src\constants\apiEndpoints.js",
    "src\features\auth\authSlice.js",
    "src\features\auth\authActions.js",
    "src\features\posts\postSlice.js",
    "src\features\posts\postActions.js",
    "src\features\store.js",
    "src\hooks\useAuth.js",
    "src\hooks\useDebounce.js",
    "src\pages\HomePage.js",
    "src\pages\LoginPage.js",
    "src\pages\RegisterPage.js",
    "src\pages\PostDetailPage.js",
    "src\pages\CreatePostPage.js",
    "src\pages\EditPostPage.js",
    "src\pages\NotFoundPage.js",
    "src\routes\AppRoutes.js",
    "src\routes\PrivateRoute.js",
    "src\utils\formatDate.js",
    "src\App.js",
    "src\index.js",
    "src\index.css"
)

# 4. Root folder banayen (agar pehle se na ho)
if (-not (Test-Path $root)) {
    New-Item -ItemType Directory -Path $root | Out-Null
}

# 5. Har sub-directory banayen (agar na ho toh)
foreach ($d in $dirs) {
    $fullDir = Join-Path $root $d
    if (-not (Test-Path $fullDir)) {
        New-Item -ItemType Directory -Path $fullDir | Out-Null
    }
}

# 6. Har text-file banayen (agar na ho toh), content bilkul khaali
foreach ($f in $files) {
    $fullFile = Join-Path $root $f
    if (-not (Test-Path $fullFile)) {
        # Ensure parent directory exists
        $parent = Split-Path $fullFile
        if (-not (Test-Path $parent)) {
            New-Item -ItemType Directory -Path $parent | Out-Null
        }
        # Create empty file
        New-Item -ItemType File -Path $fullFile -Force | Out-Null
    }
}
