# Forensic Mapper (PowerShell Version)
# Usage: .\scripts\forensic_mapper.ps1 "Rem"
param([string]$Pattern)

$ArchiveDir = "william-engine/archives/raw_assets"
$Files = Get-ChildItem -Path $ArchiveDir -Filter "conversations-*.json" | Sort-Object Name

foreach ($File in $Files) {
    Write-Host "Scanning $($File.Name)..." -ForegroundColor Cyan
    # Use Select-String to find the pattern with context
    $Results = Get-Content $File.FullName | Select-String -Pattern $Pattern -Context 1
    
    foreach ($Result in $Results) {
        $LineNum = $Result.LineNumber
        $Context = $Result.Line.Trim()
        Write-Host "[$($File.Name):$LineNum] $Context"
    }
}
