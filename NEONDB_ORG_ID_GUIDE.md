# NeonDB Organization ID Alma Rehberi

## Yöntem 1: NeonDB Dashboard'dan (En Kolay)

### Adım 1: Dashboard'a Giriş
1. https://console.neon.tech adresine gidin
2. Giriş yapın

### Adım 2: Organization ID'yi Bulun

**Seçenek A: URL'den**
1. Dashboard'da herhangi bir projeye tıklayın
2. Browser'ın adres çubuğuna bakın
3. URL şu formatta olacak: `https://console.neon.tech/project/xxxxx?org_id=yyyyy`
4. `org_id=yyyyy` kısmındaki `yyyyy` değeri organization ID'nizdir

**Seçenek B: Settings Sayfasından**
1. Sağ üstteki profil ikonuna tıklayın
2. "Account Settings" veya "Settings" seçin
3. "Organization" veya "Team" bölümüne gidin
4. Organization ID burada gösterilir

**Seçenek C: API Response'dan**
1. Browser Developer Tools'u açın (F12)
2. Network tab'ına gidin
3. NeonDB dashboard'da bir sayfayı yenileyin
4. API isteklerinden birini seçin
5. Response'da `org_id` veya `organization_id` değerini bulun

## Yöntem 2: API ile Otomatik Alma

Script'i güncelleyerek organization ID'yi otomatik alabiliriz. Ancak API endpoint'i değişmiş olabilir.

## Yöntem 3: Manuel Olarak Script'e Ekleme

Organization ID'yi bulduktan sonra, script'e environment variable olarak ekleyebilirsiniz:

```bash
export NEON_ORG_ID=your_org_id_here
export NEON_API_KEY=your_api_key
node scripts/neondb-setup.js
```

## Organization ID Formatı

Organization ID genellikle şu formatta olur:
- UUID formatında: `550e8400-e29b-41d4-a716-446655440000`
- Veya kısa format: `org_xxxxx`

## Örnek Kullanım

Organization ID'yi bulduktan sonra:

```bash
# Windows PowerShell
$env:NEON_ORG_ID="your_org_id"
$env:NEON_API_KEY="napi_az5zg51ts0ges934f7un5nb1gntat6zmesh2zw0def7p7el6mjyjla0ekf2t2m2o"
$env:VERCEL_TOKEN="UjW5UH68XaRb9UGKdmT0J6JP"
node scripts/setup-deployment.js
```

## Sorun Giderme

### "Organization ID bulamıyorum"
- URL'deki `org_id` parametresine bakın
- Browser console'da `localStorage` veya `sessionStorage` içinde arayın
- NeonDB support'a ulaşın: support@neon.tech

### "API'de organization ID gerekiyor"
- Script'i güncelledik, artık organization ID'yi otomatik alabilir
- Veya manuel olarak environment variable olarak ekleyin

