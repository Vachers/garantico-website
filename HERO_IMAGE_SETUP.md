# Hero Section Görsel Kurulumu

## Görsel Dosyasını Ekleme

Hero section için görsel dosyasını eklemek için:

1. Görsel dosyanızı `public` klasörüne kopyalayın
2. Dosya adını `hero-image.jpg` olarak kaydedin (veya aşağıdaki formatları kullanabilirsiniz)

## Desteklenen Formatlar

- `hero-image.jpg`
- `hero-image.png`
- `hero-image.webp`

## Dosya Konumu

```
public/
  └── hero-image.jpg
```

## Alternatif Dosya Adı Kullanımı

Eğer farklı bir dosya adı kullanmak isterseniz, `app/[locale]/page.tsx` dosyasındaki şu satırı güncelleyin:

```tsx
backgroundImage: "url('/hero-image.jpg')",
```

## Önerilen Görsel Özellikleri

- **Boyut**: 1920x1080px veya daha yüksek çözünürlük
- **Format**: JPG (optimize edilmiş) veya WebP
- **Aspect Ratio**: 16:9 veya benzer
- **Dosya Boyutu**: Mümkün olduğunca küçük (1-2MB altı)

## Not

Görsel eklendikten sonra, overlay (koyu katman) metinlerin okunabilirliğini sağlamak için otomatik olarak uygulanır.

