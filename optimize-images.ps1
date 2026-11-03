Add-Type -AssemblyName System.Drawing

function Optimize-Image {
    param (
        [string]$Path,
        [int]$MaxDim = 1600,
        [long]$Quality = 82
    )

    $file = Get-Item $Path
    if ($file.Length -lt 200KB) {
        Write-Output "Skipping small file: $($file.Name) ($([math]::Round($file.Length/1KB,1)) KB)"
        return
    }

    $imgBytes = [System.IO.File]::ReadAllBytes($file.FullName)
    $ms = New-Object System.IO.MemoryStream(,$imgBytes)
    $img = [System.Drawing.Image]::FromStream($ms)

    $origW = $img.Width
    $origH = $img.Height

    # Calculate new dimensions
    $ratio = 1.0
    if ($origW -gt $MaxDim -or $origH -gt $MaxDim) {
        if ($origW -ge $origH) {
            $ratio = $MaxDim / $origW
        } else {
            $ratio = $MaxDim / $origH
        }
    }

    $newW = [int]($origW * $ratio)
    $newH = [int]($origH * $ratio)

    $bmp = New-Object System.Drawing.Bitmap($newW, $newH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    $g.DrawImage($img, 0, 0, $newW, $newH)
    $g.Dispose()
    $img.Dispose()
    $ms.Dispose()

    # Determine encoder
    $ext = $file.Extension.ToLower()
    $tempPath = "$($file.FullName).tmp"

    if ($ext -in @('.jpg', '.jpeg')) {
        $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $Quality)
        $bmp.Save($tempPath, $codec, $encoderParams)
    } elseif ($ext -eq '.png') {
        $bmp.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
    } else {
        $bmp.Dispose()
        return
    }

    $bmp.Dispose()

    $newLength = (Get-Item $tempPath).Length
    if ($newLength -lt $file.Length) {
        Move-Item -Path $tempPath -Destination $file.FullName -Force
        $oldMB = [math]::Round($file.Length / 1MB, 2)
        $newMB = [math]::Round($newLength / 1MB, 2)
        $pct = [math]::Round((1 - ($newLength / $file.Length)) * 100, 1)
        Write-Output "Optimized $($file.Name): $oldMB MB -> $newMB MB (-$pct%)"
    } else {
        Remove-Item $tempPath -Force
        Write-Output "Kept original $($file.Name)"
    }
}

Get-ChildItem assets/image -File | ForEach-Object {
    Optimize-Image -Path $_.FullName -MaxDim 1440 -Quality 82
}
