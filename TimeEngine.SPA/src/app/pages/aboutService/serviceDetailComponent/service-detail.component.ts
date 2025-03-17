import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactPopupComponent } from '../../contact/contactPopup/contact-popup.component';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, ContactPopupComponent],
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.scss'
})
export class ServiceDetailComponent {
  service: any;
  showPopup: boolean = false;

  services = [
    {
      title: 'Aplikacje Webowe',
      description: 'Nowoczesne, szybkie i skalowalne aplikacje webowe, które napędzają Twój biznes.',
      image: '/assets/images/web-dev.jpg',
      details: `
        Tworzymy **nowoczesne, intuicyjne i wydajne aplikacje webowe**, które nie tylko świetnie wyglądają,
        ale przede wszystkim działają bezbłędnie. Nasze rozwiązania są dostosowane do Twojego biznesu –
        od prostych landing page’ów po zaawansowane systemy zarządzania danymi i aplikacje SaaS.

        **🔹 Szybkość i wydajność** – optymalizacja pod Core Web Vitals (Google PageSpeed)
        **🔹 Perfekcyjna responsywność** – idealnie działa na każdym urządzeniu
        **🔹 SEO-Friendly** – zoptymalizowane pod wyszukiwarki dla większej widoczności
        **🔹 Integracja z systemami biznesowymi** – CRM, ERP, API płatności, systemy logistyczne
        **🔹 Bezpieczeństwo** – wdrażamy najwyższe standardy szyfrowania i ochrony danych

        Nasze aplikacje są budowane na bazie **Angular, React, .NET, Node.js oraz Firebase**, co pozwala nam
        tworzyć szybkie i bezpieczne rozwiązania.
      `,
      process: [
        '📊 Analiza wymagań biznesowych i audyt technologiczny',
        '🎨 Projektowanie UI/UX dla maksymalnej konwersji',
        '💻 Tworzenie aplikacji webowych w Angular, React i .NET',
        '🔗 Integracja z systemami zewnętrznymi (CRM, ERP, API)',
        '🚀 Optymalizacja, testowanie i wdrożenie na serwer produkcyjny'
      ],
      products: ['Angular', 'React', '.NET', 'Node.js', 'Firebase', 'Azure']
    },
    {
      title: 'Aplikacje Mobilne',
      description: 'Natywne i hybrydowe aplikacje mobilne, które angażują użytkowników i zwiększają sprzedaż.',
      image: '/assets/images/mobile.jpg',
      details: `
        **Zdominuj rynek mobilny dzięki aplikacjom, które pokochają Twoi klienci!**
        Tworzymy **szybkie, bezpieczne i intuicyjne aplikacje mobilne** dostosowane do Twojego biznesu.

        **🔹 Aplikacje natywne i hybrydowe** – rozwijamy projekty w **Swift, Kotlin, Flutter, React Native**
        **🔹 UX dopasowane do użytkowników** – nowoczesny design, płynna nawigacja i wygoda użytkowania
        **🔹 Integracja z chmurą** – pełna synchronizacja z Firebase, AWS i Google Cloud
        **🔹 Obsługa IoT i wearables** – współpraca z Apple Watch, Android Wear i inteligentnymi urządzeniami
        **🔹 Skalowalność i bezpieczeństwo** – najwyższe standardy ochrony danych

        **Czy wiesz, że 80% ruchu w Internecie pochodzi z urządzeń mobilnych?**
        Pomożemy Ci stworzyć aplikację, która wyróżni się na tle konkurencji!
      `,
      process: [
        '🔍 Analiza rynku i strategia biznesowa',
        '🎨 Tworzenie makiet UX/UI i prototypowanie',
        '📲 Programowanie natywne (Swift, Kotlin) lub hybrydowe (Flutter, React Native)',
        '🔗 Integracja z backendem, bazami danych i chmurą',
        '🚀 Wdrożenie w App Store i Google Play, optymalizacja SEO i ASO'
      ],
      products: ['Swift', 'Kotlin', 'Flutter', 'React Native', '.NET MAUI']
    },
    {
      title: 'Chmura (AWS, Azure, GCP)',
      description: 'Zaawansowane rozwiązania chmurowe dla firm, które chcą zmniejszyć koszty IT i zwiększyć efektywność.',
      image: '/assets/images/cloud.jpg',
      details: `
        **Bezpieczeństwo, skalowalność i optymalizacja kosztów – przenieś swój biznes do chmury!**

        Wdrażamy **zaawansowane rozwiązania chmurowe** na platformach **AWS, Azure i Google Cloud**,
        które pomagają firmom osiągać **większą wydajność i niższe koszty operacyjne**.

        **🔹 Redukcja kosztów IT nawet o 60%** dzięki efektywnej alokacji zasobów
        **🔹 Automatyzacja procesów** – infrastruktura jako kod (Terraform, CloudFormation)
        **🔹 Wysoka dostępność i skalowalność** – migracja do kontenerów (Docker, Kubernetes)
        **🔹 Integracja z Twoimi systemami** – ERP, CRM, API płatności, IoT
        **🔹 Zaawansowane zabezpieczenia** – ochrona danych zgodnie z RODO i ISO 27001

        Zaufaj naszym ekspertom – zaprojektujemy rozwiązanie dopasowane do Twojej firmy!
      `,
      process: [
        '📊 Analiza aktualnej infrastruktury IT i potrzeb biznesowych',
        '🚀 Projektowanie i wdrażanie architektury chmurowej',
        '🛠 Implementacja kontenerów (Docker, Kubernetes)',
        '💡 Automatyzacja i optymalizacja kosztów utrzymania',
        '🔐 Wdrożenie systemów zabezpieczeń i backupów'
      ],
      products: ['AWS Lambda', 'Azure Functions', 'Google Cloud', 'Docker', 'Kubernetes', '.NET Core']
    },
    {
      title: 'Aplikacje Desktopowe',
      description: 'Tworzymy profesjonalne aplikacje desktopowe dla Windows, macOS i Linux.',
      image: '/assets/images/desktop.jpg',
      details: `
        **Nie każda aplikacja może działać w przeglądarce – potrzebujesz aplikacji desktopowej?**
        Tworzymy **stabilne, szybkie i wydajne aplikacje desktopowe** dla firm i instytucji.

        **🔹 Obsługa dużych zbiorów danych** – integracja z SQL/NoSQL
        **🔹 Aplikacje biznesowe** – ERP, systemy raportowania, narzędzia analityczne
        **🔹 Integracja z urządzeniami firmowymi** – drukarki, skanery, systemy automatyki
        **🔹 Pełne wsparcie dla Windows, macOS i Linux**
        **🔹 Zabezpieczenia klasy enterprise** – szyfrowanie danych, RODO, ISO 27001

        **Dzięki zastosowaniu .NET, JavaFX, Electron.js i Qt tworzymy aplikacje dopasowane do Twoich potrzeb!**
      `,
      process: [
        '🔍 Analiza wymagań i specyfikacja projektu',
        '🖥 Projektowanie interfejsu użytkownika (UI/UX)',
        '💻 Programowanie w .NET WPF, Electron.js, JavaFX, C#',
        '🛠 Testowanie aplikacji na różnych platformach',
        '🚀 Wdrożenie i wsparcie techniczne'
      ],
      products: ['.NET WPF', 'Electron.js', 'JavaFX', 'C#', 'Qt']
    }
  ];


  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      const decodedTitle = params['title']
        .replace(/-/g, ' ')
        .replace(/[(),]/g, '')
        .toLowerCase();

      this.service = this.services.find(s =>
        s.title.toLowerCase().replace(/[(),]/g, '') === decodedTitle
      );

      if (!this.service) {
        this.router.navigate(['/services']);
      }
    });
  }

  togglePopup() {
    this.showPopup = !this.showPopup;
  }

  goBack() {
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        const lastViewedService = localStorage.getItem('lastViewedService');
        if (lastViewedService) {
          requestAnimationFrame(() => {
            const element = document.querySelector(`[data-title="${lastViewedService}"]`);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          });
        }
      }, 500);
    });
  }

}
