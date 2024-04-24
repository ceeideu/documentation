**Polski Identyfikator Reklamowy (PIR)**

W odpowiedzi na wyzwania wynikające z blokowania cookies 3rd party przez przeglądarkę Chrome, **rozwijamy platformę ID Exchange, która będzie dostarczała PIR - Polski Identyfikator Reklamowy.**Celem ID Exchange i identyfikatora PIR jest zapewnienie identyfikacji użytkowników pomiędzy domenami i urządzeniami w ekosystemie cookieless (3rd party) i przez to utrzymanie‚ traconych wraz blokowaniem cookies (3rd party) zdolności, w tym: retargetingu, personalizacji bazującej na danych, optymalizacji częstości dotarcia do użytkownika (capping), pomiaru cross-domenowego zasięgów kampanii oraz atrybucji.

**ID Exchange stanowi silną przeciwwagę do innych dostępnych rozwiązań w zakresie identyfikacji użytkowników.**

** 1) Retargeting w Privacy Sandbox (Google) jest droższy dla reklamodawców**

Konieczność zaproponowania alternatywy do rozwiązań Google'a (Privacy Sandbox) jest fakt, spodziewanej (i też potwierdzonej nieformalnie przez przedstawicieli Google'a) niższej niż obecnie efektywności kampanii retargetingowych realizowanych w ramach Protected Audence API (PAAPI), co znowu podniesie koszt pozyskania konwersji dla klientów. Następstwem wyższego kosztu sprzedaży będzie najprawdopodobniej ograniczenie lub obniżenie przez reklamodawców stawek co spowoduje długofalowo obniżenie przychodów wydawców i marży platform. Z perspektywy reklamodawców będzie to też skutkowało ograniczeniem skali lub akceptacją wyższych kosztów. Wykorzystanie identyfikatora PIR zapewni zachowanie obecnych efektywności kampanii lub nawet ich zwiększenia (wersja optymistyczna) w wyniku lepszych i trwalszych metod identyfikacji użytkowników.

**2) PIR w porównaniu do identyfikacji probabilistycznej jest realnym identyfikowaniem użytkownika**

PIR stanowi alternatywę do wszystkich dostawców ID bazujących na metodach probabilistycznych (chociaż ID Exchange takie też będzie wykorzystywał w sposób selektywny), które na bazie naszych testów pokazują niską skuteczność (testy dostępne w WP) zidentyfikowania tego samego użytkownika pomiędzy domenami lub polegają na sygnałach, które w niedługiej przyszłości zostaną ograniczone (np.: IP - IP Protection lub ograniczany user agent).

Zarówno rozwiązanie proponowane przez Google'a jak i dostawców identyfikacji probabilistycznej nie będą zapewniały niezbędnych funkcjonalność lub ich efektywności w przeciwieństwie do proponowanego przez nas ID Exchange.

**Przy rozwoju ID Exchange'a przyjęliśmy szereg fundamentalnych założeń.**

**1) PIR jako identyfikator zachowujący retargeting, capping oraz analitykę cross-domenową będzie dostarczany wszystkim uczestnikom rynku (pod warunkiem integracji z ID Exchange).**

Zakładamy, że każdy podmiot - wydawca i platforma popytowa (DSP) może się zintegrować z ID Exchange i zacząć partycypować na rzecz reklamodawców w wymianie PIR. Zapewniamy łatwy sposób integracji poprzez rozwijane SDK oraz moduł prebidowy, specyfikacje techniczne i wsparcie bezpośrednie. Działanie SDK oraz modułu prebidowego znajdują się w osobnym dokumencie (1)

**2) Metody identyfikacji cross-domenowej użytkowników w ramach ID Exchange będą zapewniać jakość oraz skalę.**

Podstawową metodą identyfikacji użytkowników jest wymiana hashy adresów e-mail. Takie podejście zapewnia wysoką jakość i trwałość identyfikacji (z analizy długości życia identyfikatorów deterministycznych w ekosystemie WP wynika, że ponad 70% takich użytkowników 'widzimy' dłużej niż 90 dni oraz pewność identyfikacji tego samego użytkownika utrzymuje się powyżej 95%). Problemem jednak jest tu osiągnięcie skali, tzn. liczby zidentyfikowanych cross-domenowo użytkowników. W celu zbudowania większego zasięgu będziemy wykorzystywali też metodę bazującą na 1st party ID wydawców i reklamodawców przechowywane w tzw. persistent cookies oraz w dalszej kolejności identyfikację probabilistyczną (metody własne - wytworzone wewnątrz konsorcjum lub przez dostawców zewnętrznych). Zakładamy też, że identyfikacja probabilistyczna nie zapewnia wysokiej precyzji (na podstawie testów z dostawcami) natomiast stosowana selektywnie, w zależności od poziomu pewności identyfikacji użytkownika, daje cenne uzupełnienie skali. Nie będziemy równocześnie wykorzystywać żadnych sposobów, które mogą być w krótkiej perspektywie zablokowanymi w tym adresów IP. 

** 3) ID Exchange zapewnia bezpieczeństwo i transparentność wymiany danych w ekosystemie reklamowym z punktu widzenia użytkownika Internetu.**

PIR może być wykorzystany jedynie przez partnera, który będzie miał aktywną i autoryzowaną przez administratora platformy, integrację z ID Exchange. Metody szyfrowania i tokenizacji identyfikatorów zapobiegną przed 'wyprowadzaniem' identyfikatorów poza ekosystem i przez to stworzeniem równoległego rozwiązania. 

Istotnym aspektem jest fakt że PIR, jest długo-żyjącym ale nie permanentnym identyfikatorem, który nie zawiera pierwotnych danych jednoznacznie identyfikujących użytkownika, z których został wygenerowany (np. hashy adresów e-mail). Dodatkowo PIR w otwartym Internecie (podczas aukcji RTB) przekazywany jest w formie krótko-żyjącego tokenu, którego zdekodowanie nie jest możliwe bez ciągłego dostępu do platformy ID Exchange w celu pozyskania aktualnych kluczy dekodujących które zmieniają się bardzo często (zakładamy - co godzinę). Metody generowania i szyfrowania PIR znajdują się w osobnym dokumencie(2)

**4) ID Exchange jest rozwijany i będzie utrzymywany przez WP jednak zapewniamy równy dostęp i transparentność działania niezależnie od stopnia konkurencyjności w aspekcie relacji z klientami.**

ID Exchange jest tworzony w idei pełnej izolacji od jakiejkolwiek platformy (reklamowej, statystycznej), podmiotu (np. WP, Onet) w tym przede wszystkim od Platformy Reklamowej WP.

W I etapie system jest hostowany z infrastruktury WP, która jest wydzielona w taki sposób, żeby umożliwiła zewnętrzny audyt. Dodatkowo w każdej chwili będzie mógł być przeniesiony na inną platformę hostingową.

Docelowo cała Platforma ID Exchange będzie zapewniała wysoki poziom dostępności SLA (m.in: zapewniała HA każdych z usług, działała w wielu serwerowniach, dane będą regularnie bezpiecznie backupowane).

Architektura ID Exchange zapewniać będzie pełną skalowalność - w zależności od potrzeb będzie można konfigurować system do przyjęcia kolejnego podmiotu do współpracy.

**5) PIR może być wykorzystywany do działań reklamowych zarówno w relacji bezpośredniej z klientem jak i w środowisku programmatic.**

Wydawca zintegrowany z ID Exchange może wykorzystywać identyfikator PIR do identyfikacji użytkowników pomiędzy swoimi serwisami a stronami reklamodawców realizując dla nich działania retargetingowe. W tym przypadku Reklamodawca (tak jak do tej pory) implementuje u siebie kody trackingowe i przesyła zdarzenia do Wydawcy. Jedyną różnicą jest sposób zidentyfikowania użytkownika - w środowisku obecnym, kod trankingowy wydawcy ma dostęp do cookie w swojej domenie i przez to może odczytać swój ID użytkownika a następnie widząc tego użytkownika u siebie na stronach, wyświetlić mu reklamę. 

W środowisku cookieless, Reklamodawca dodatkowo musi przesłać w zdarzeniach trankingowych HEM (hash adresu e-mail) i swój 1st party ID (persistent cookie), co zostanie przez Wydawcę podłączonego do ID Exchange, przetłumaczone na identyfikator PIR. Dzięki temu Wydawca posiadający bazę zalogowanych użytkowników oraz otrzymujący zapytania reklamowe z innych platform Wydawniczych zintegrowanych z ID Exchange, jest w stanie powiązać użytkownika na swoich stronach oraz wyświetlić mu spersonalizowaną reklamę.

W przypadku zakupu przez DSP wymagane jest tak jak wyżej przesłanie w trackingu HEM oraz 1st party ID. Podczas odbioru eventów ze strony Reklamodawcy DSP odpytuje ID Exchange o Identyfikator PIR, który zostaje powiązany z wewnętrznym identyfikatorem platformy zakupowej (DSP). Natomiast w momencie otrzymania zapytania reklamowego od Wydawcy zawierającego tokeny PIR, może je zdekodować, aby uzyskać Identyfikator PIR, a następnie sprawdza czy w swojej bazie zawiera dane o tym użytkowniku. Jeśli tak to wyświetla mu spersonalizowaną reklamę.

Strona wydawnicza ma dwie możliwości przekazywania Tokenów PIR: poprzez komunikację s2s i standard oRTB lub poprzez dedykowany (dostarczany przez ID Exchange) moduł prebidowy.