import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Award, Target, Eye, Users, Warehouse, CheckCircle } from "lucide-react";
import { i18nConfig } from "@/lib/i18n/config";

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({
    locale: locale,
  }));
}

export default function AboutPage({ params }: { params: { locale: string } }) {
  const locale = params.locale || "tr";

  const t = {
    tr: {
      title: "Hakkımızda",
      story: {
        title: "Şirket Hikayemiz",
        content:
          "GarantiCo olarak, yem hammaddeleri sektöründe 20 yılı aşkın deneyimimizle, kaliteli ürünler ve güvenilir hizmet anlayışıyla müşterilerimize hizmet vermekteyiz. Özellikle balık unu üretimi ve tedarikinde sektörün öncü firmalarından biri olarak, Avrupa standartlarında kaliteli ürünler sunmaktayız.",
      },
      mission: {
        title: "Misyonumuz",
        content:
          "Kaliteli yem hammaddeleri tedariki ile sektörün güvenilir partneri olmak. Müşterilerimize en yüksek kalite standartlarında ürünler sunarak, onların başarısına katkıda bulunmak.",
      },
      vision: {
        title: "Vizyonumuz",
        content:
          "Sektörün güvenilir partneri olarak, sürdürülebilir ve kaliteli yem hammaddeleri tedarikinde lider konumda olmak. Müşteri memnuniyetini ön planda tutarak, sektörde örnek gösterilen bir firma olmak.",
      },
      team: {
        title: "Yönetim Ekibimiz",
        content: "Deneyimli ve uzman ekibimizle hizmetinizdeyiz.",
      },
      capacity: {
        title: "Üretim ve Depolama Kapasitesi",
        content:
          "Modern tesislerimizde yüksek kapasiteli üretim ve depolama imkanlarına sahibiz.",
      },
      quality: {
        title: "Kalite Kontrol Süreçleri",
        content:
          "Her ürünümüz, titiz kalite kontrol süreçlerinden geçmektedir. HACCP ve ISO 22000 sertifikalarımız ile kalite güvencesi sağlıyoruz.",
      },
    },
    en: {
      title: "About Us",
      story: {
        title: "Our Company Story",
        content:
          "As GarantiCo, with over 20 years of experience in the feed raw materials industry, we serve our customers with quality products and reliable service. As one of the leading companies in fish meal production and supply, we offer quality products that meet European standards.",
      },
      mission: {
        title: "Our Mission",
        content:
          "To be the reliable partner of the industry through quality feed raw materials supply. To contribute to our customers' success by offering products that meet the highest quality standards.",
      },
      vision: {
        title: "Our Vision",
        content:
          "To be in a leading position in sustainable and quality feed raw materials supply as the reliable partner of the industry. To be an exemplary company in the industry by prioritizing customer satisfaction.",
      },
      team: {
        title: "Our Management Team",
        content: "We are at your service with our experienced and expert team.",
      },
      capacity: {
        title: "Production and Storage Capacity",
        content:
          "We have high-capacity production and storage facilities in our modern facilities.",
      },
      quality: {
        title: "Quality Control Processes",
        content:
          "Each of our products goes through rigorous quality control processes. We ensure quality assurance with our HACCP and ISO 22000 certificates.",
      },
    },
  };

  const content = t[locale as keyof typeof t] || t.tr;

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
            {content.title}
          </h1>
        </div>

        {/* Company Story */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-primary-ocean" />
                <CardTitle className="text-2xl">{content.story.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-text-light leading-relaxed">
                {content.story.content}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card hover>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8 text-primary-ocean" />
                <CardTitle>{content.mission.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-text-light leading-relaxed">{content.mission.content}</p>
            </CardContent>
          </Card>

          <Card hover>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Eye className="w-8 h-8 text-primary-ocean" />
                <CardTitle>{content.vision.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-text-light leading-relaxed">{content.vision.content}</p>
            </CardContent>
          </Card>
        </div>

        {/* Management Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-text-dark mb-8 text-center">
            {content.team.title}
          </h2>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-primary-ocean" />
                <p className="text-text-light">{content.team.content}</p>
              </div>
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="text-center">
                  <div className="w-24 h-24 bg-primary-ocean/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-primary-ocean" />
                  </div>
                  <h3 className="font-semibold text-text-dark mb-2">
                    {locale === "tr" ? "Genel Müdür" : "General Manager"}
                  </h3>
                  <p className="text-sm text-text-light">
                    {locale === "tr" ? "20+ yıl deneyim" : "20+ years experience"}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-primary-ocean/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Award className="w-12 h-12 text-primary-ocean" />
                  </div>
                  <h3 className="font-semibold text-text-dark mb-2">
                    {locale === "tr" ? "Kalite Müdürü" : "Quality Manager"}
                  </h3>
                  <p className="text-sm text-text-light">
                    {locale === "tr" ? "Sertifikalı uzman" : "Certified expert"}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-primary-ocean/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Target className="w-12 h-12 text-primary-ocean" />
                  </div>
                  <h3 className="font-semibold text-text-dark mb-2">
                    {locale === "tr" ? "Satış Müdürü" : "Sales Manager"}
                  </h3>
                  <p className="text-sm text-text-light">
                    {locale === "tr" ? "Müşteri odaklı" : "Customer focused"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Production & Storage Capacity */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Warehouse className="w-8 h-8 text-primary-ocean" />
                <CardTitle className="text-2xl">{content.capacity.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-text-light mb-6">{content.capacity.content}</p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-primary-ocean/5 rounded-lg">
                  <div className="text-3xl font-bold text-primary-ocean mb-2">10,000+</div>
                  <p className="text-text-light">
                    {locale === "tr" ? "Ton Depolama" : "Tons Storage"}
                  </p>
                </div>
                <div className="text-center p-4 bg-primary-ocean/5 rounded-lg">
                  <div className="text-3xl font-bold text-primary-ocean mb-2">5,000+</div>
                  <p className="text-text-light">
                    {locale === "tr" ? "Ton/Ay Üretim" : "Tons/Month Production"}
                  </p>
                </div>
                <div className="text-center p-4 bg-primary-ocean/5 rounded-lg">
                  <div className="text-3xl font-bold text-primary-ocean mb-2">24/7</div>
                  <p className="text-text-light">
                    {locale === "tr" ? "Kesintisiz Hizmet" : "24/7 Service"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Quality Control */}
        <section>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-success-green" />
                <CardTitle className="text-2xl">{content.quality.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-text-light mb-6">{content.quality.content}</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-success-green/5 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-success-green flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-text-dark mb-1">HACCP</h4>
                    <p className="text-sm text-text-light">
                      {locale === "tr"
                        ? "Gıda güvenliği yönetim sistemi"
                        : "Food safety management system"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-success-green/5 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-success-green flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-text-dark mb-1">ISO 22000</h4>
                    <p className="text-sm text-text-light">
                      {locale === "tr"
                        ? "Gıda güvenliği standardı"
                        : "Food safety standard"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-success-green/5 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-success-green flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-text-dark mb-1">
                      {locale === "tr" ? "EU Onaylı" : "EU Approved"}
                    </h4>
                    <p className="text-sm text-text-light">
                      {locale === "tr"
                        ? "Avrupa Birliği standartları"
                        : "European Union standards"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-success-green/5 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-success-green flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-text-dark mb-1">
                      {locale === "tr" ? "Sürekli Kontrol" : "Continuous Control"}
                    </h4>
                    <p className="text-sm text-text-light">
                      {locale === "tr"
                        ? "Her parti kalite kontrolü"
                        : "Quality control for each batch"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

