# Ahl Al Markabat - Clean Production ZIP Packaging Script
$ErrorActionPreference = "Stop"

$workDir = "d:\AMD RYZEN 7 5700G\Documents\AhlALmarkabat_SericeProvider\AhlAlmarkabat_ServiceProvider\AhlAlMarkabat_Frontend - Copy (2)"
$stagingDir = Join-Path $workDir "staging_clean_export"
$frontStage = Join-Path $stagingDir "AhlAlMarkabat_Frontend"
$backStage = Join-Path $stagingDir "AhlAlMarkabat_Backend"

Write-Host "Creating staging directories..." -ForegroundColor Cyan
if (Test-Path $stagingDir) { Remove-Item -Recurse -Force $stagingDir }
New-Item -ItemType Directory -Path $frontStage -Force | Out-Null
New-Item -ItemType Directory -Path $backStage -Force | Out-Null

Write-Host "Copying Clean Frontend source files..." -ForegroundColor Cyan
# Copy frontend root files and folders excluding node_modules, dist, git, zip
$excludeDirs = @("node_modules", "dist", ".git", ".gemini", "staging_clean_export", "backend", "ai-service", "nginx", ".github")
robocopy $workDir $frontStage /E /XD $excludeDirs /XF "*.zip" "package-lock.json"
# robocopy exit codes 0-7 are success
if ($LASTEXITCODE -gt 7) {
    throw "Robocopy frontend failed with exit code $LASTEXITCODE"
}

Write-Host "Copying Clean Backend source files..." -ForegroundColor Cyan
$backSrc = Join-Path $workDir "backend"
$backExcludeDirs = @("node_modules", "dist", ".git")
robocopy $backSrc $backStage /E /XD $backExcludeDirs /XF "*.zip" "package-lock.json"
if ($LASTEXITCODE -gt 7) {
    throw "Robocopy backend failed with exit code $LASTEXITCODE"
}

Write-Host "Creating Clean Production ZIP Archives..." -ForegroundColor Cyan
$frontZip = Join-Path $workDir "AhlAlMarkabat_Frontend_Clean_Production.zip"
$backZip = Join-Path $workDir "AhlAlMarkabat_Backend_Clean_Production.zip"

if (Test-Path $frontZip) { Remove-Item -Force $frontZip }
if (Test-Path $backZip) { Remove-Item -Force $backZip }

Compress-Archive -Path (Join-Path $frontStage "*") -DestinationPath $frontZip -CompressionLevel Optimal
Compress-Archive -Path (Join-Path $backStage "*") -DestinationPath $backZip -CompressionLevel Optimal

# Copy to parent folder as well for instant access
$parentDir = "d:\AMD RYZEN 7 5700G\Documents\AhlALmarkabat_SericeProvider\AhlAlmarkabat_ServiceProvider"
Copy-Item $frontZip (Join-Path $parentDir "AhlAlMarkabat_Frontend_Clean_Production.zip") -Force
Copy-Item $backZip (Join-Path $parentDir "AhlAlMarkabat_Backend_Clean_Production.zip") -Force

# Clean up staging directory
Remove-Item -Recurse -Force $stagingDir

Write-Host "========================================================" -ForegroundColor Green
Write-Host "SUCCESS: Clean Production ZIP files generated successfully!" -ForegroundColor Green
Write-Host "1. Frontend ZIP: $frontZip" -ForegroundColor Yellow
Write-Host "2. Backend ZIP:  $backZip" -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Green

Get-Item $frontZip, $backZip | Format-Table Name, @{Name="Size (MB)"; Expression={[math]::Round($_.Length / 1MB, 2)}}, LastWriteTime
