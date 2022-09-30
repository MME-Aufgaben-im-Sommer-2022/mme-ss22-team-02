
## Shop-For-Me
<br>
  
ShopForMe bietet eine Platform für Menschen einer Gemeinde, Freunde, Nachbarn, et cetera, um eine Koordination  innerhalb selbst erstellter Gruppen zur gegenseitigen Lebensmittelbesorgung zu ermöglichen zur Einsparung von Ressourcen.  
<br>
Die wichtigsten Features unseres Projekts sind die Loginseite (OAuth-2 Anmeldung), die Erstellung von - und Beitritt der Communities (mittels Beitrittscode), die Erstellung und Annahme von Nutzeranfragen (im Sinne von Lebensmittelanforderungen und das Besorgen dieser) und die Chatfunktion, in welcher die User sich bezüglich der "Bestellung" absprechen können. Zudem haben wir einen augenfreundlichen Dark-Mode implementiert.  
Die intendierten Zielgruppen sind zeitlich eingeschränkte Personen, die sich beispielsweise innerhalb eines Ortes (zum Beispiel: Anlegen einer Community, welche den Ortsnamen enthält) untereinander absprechen können, wer welche Lebensmittel wann einholt, oder auch Studenten, die sich hierdurch zeitliche und finanzielle Ressourcen (e.g. Spritkosten, Wegkosten) einsparen können. (Beispiel: Wohnen im selben Wohnheim)  
Die Motivation hierfür ist das Schaffen einer zentralen Anwendung, die sich von den üblichen Kommunikationskanälen (Facebook, Whatsapp, et cetera) unterscheidet und somit einen eigenen,  Kommunikationskanal für die Organisation und Beschaffung von Lebensmitteln bereitstellt. Durch die minimalistische Auswahl der Funktionen bietet man den Nutzern der Anwendung eine klare und intuitive Möglichkeit zur einfachen Absprache innerhalb einer Community untereinander an, welche nur "ausgewählten" Personen (User verschickt "Einladungscode") zur Verfügung gestellt wird.  
Alle aktuell implementierten Funktionen sind im folgenden Abschnitt beschrieben.  
<br>
- [Deployment](https://shopforme.software-engineering.education/)  
<br>
- [Release-Version](https://github.com/MME-Aufgaben-im-Sommer-2022/mme-ss22-team-02/releases/tag/FinalRelease)  
<br>

## Beschreibung & Anleitung
<br>
  
[Demo-Video ShopForMe](https://github.com/MME-Aufgaben-im-Sommer-2022/mme-ss22-team-02/blob/master/.docs/videos/shopForMeVideo.mp4)  
<br>
  
| Funktion        | Verwendung           | Screenshot  |
| ------------- |:-------------:| :-----:|
| Login     | Um die Anwendung wie intendiert zu nutzen, kann der User sich mit Klick auf die entsprechenden Buttons der Login-Seite anmelden. Dazu wird ein bereits vorhandenes Konto bei Google, Facebook oder GitHub benötigt, über welches man sich dann mit ShopForMe verbindet.    | ![](https://github.com/MME-Aufgaben-im-Sommer-2022/mme-ss22-team-02/blob/master/.docs/images/appScreenshots/login.png) |
| Grundsätzliches      | Die Seitenleiste auf der linken Seite enthält den Zugriff auf die Funktionen: Light/Dark-Mode, Profil-Optionen, Logout, Gruppe beitreten/erstellen. Ebenso befinden sich dort auch die Gruppen, denen der User beigetreten ist, und kann zwischen ihnen wählen und auf den Inhalt zugreifen.     | ![](https://github.com/MME-Aufgaben-im-Sommer-2022/mme-ss22-team-02/blob/master/.docs/images/appScreenshots/sidebar.png)   |
| Profil-Optionen | Mit Klick auf das Zahnrad der Seitenleiste öffnet sich eine Profilansicht. Innerhalb dieser ist es möglich den User-Namen in der Zeile zu ändern und zu speichern, um den Namen ins Profil zu übernehmen und als sichtbaren Namen für andere zu verwenden.       | ![](https://github.com/MME-Aufgaben-im-Sommer-2022/mme-ss22-team-02/blob/master/.docs/images/appScreenshots/profile.png)    |
| Gruppe beitreten/erstellen      | Das Pluszeichen der Seitenleiste öffnet den User die Möglichkeit, einer bestehenden Gruppe beizutreten oder eine neue Gruppe zu erstellen. Beim Erstellen einer Gruppe kann der User einen Namen vergeben und eine Farbe für die Anzeige wählen und diese dann über den Beitreten Button erstellen, während er für das Beitreten zu einer bestehenden Gruppe den Code dieser kennen, eingeben und bestätigen muss.         | ![](https://github.com/MME-Aufgaben-im-Sommer-2022/mme-ss22-team-02/blob/master/.docs/images/appScreenshots/joinGroup.png) ![](https://github.com/MME-Aufgaben-im-Sommer-2022/mme-ss22-team-02/blob/master/.docs/images/appScreenshots/newGroup.png)  |
| Gruppeninfo, Gruppe verlassen      | In einer Gruppe kann der User mit den linken oberen Button neben der Seitenleiste eine Info-Ansicht zur Gruppe öffnen, auf welcher der Beitrittscode zu sehen ist und die Möglichkeit zum verlassen der Gruppe mit Hilfe des dort befindlichen Buttons besteht.      | ![](https://github.com/MME-Aufgaben-im-Sommer-2022/mme-ss22-team-02/blob/master/.docs/images/appScreenshots/group.png)   |
| Neue Anfrage erstellen      | Über den Button rechts oben öffnet sich ein Fenster zum erstellen einer neuen Anfrage. Der User kann hier seine Einkaufswünsche hinzufügen und diese dann ändern oder wieder löschen, bevor er sie veröffentlicht.      | ![](https://github.com/MME-Aufgaben-im-Sommer-2022/mme-ss22-team-02/blob/master/.docs/images/appScreenshots/newRequest.png)   |
| Chat      | Wurde eine Anfrage angenommen ist es über die Chat-Funktion möglich Nachrichten zwischen dem Bringer und Empfänger auszutauschen. Dieser ist über das Chatsymbol auf der entsprechenden Anfragekarte zu öffnen.      | ![](https://github.com/MME-Aufgaben-im-Sommer-2022/mme-ss22-team-02/blob/master/.docs/images/appScreenshots/chat.png)   |
| Anfrage annehmen/abbrechen      | Ist eine Anfrage in einer Gruppe veröffentlicht worden, kann diese von anderen Teilnehmern der Gruppe gesehen und angenommen werden, ebenso ist es möglich diese abzubrechen von Bringer sowie Empfänger. Innerhalb der Anfrage kann man auf mehr klicken um alle Artikel angezeit zu bekommen.      | ![](https://github.com/MME-Aufgaben-im-Sommer-2022/mme-ss22-team-02/blob/master/.docs/images/appScreenshots/openRequest.png) ![](https://github.com/MME-Aufgaben-im-Sommer-2022/mme-ss22-team-02/blob/master/.docs/images/appScreenshots/myRequest.png) ![](https://github.com/MME-Aufgaben-im-Sommer-2022/mme-ss22-team-02/blob/master/.docs/images/appScreenshots/myRequest2.png) ![](https://github.com/MME-Aufgaben-im-Sommer-2022/mme-ss22-team-02/blob/master/.docs/images/appScreenshots/allArticles.png)  |

## Team
<br>
  
| Name        | E-Mail-Adresse           | Foto  |
| ------------- |:-------------:| -----:|
| Jonas Freyberg     | Jonas.Freyberg@stud.uni-regensburg.de | ![](https://github.com/MME-Aufgaben-im-Sommer-2022/mme-ss22-team-02/blob/master/.docs/images/jonas.jpg) |
| Jennifer Anette Reber      | jennifer-anette.reber@stud.uni-regensburg.de      | ![](https://github.com/MME-Aufgaben-im-Sommer-2022/mme-ss22-team-02/blob/master/.docs/images/jenny.jpg) |
| Johannes Jumpertz | johannes.jumpertz@stud.uni-regensburg.de      | ![](https://github.com/MME-Aufgaben-im-Sommer-2022/mme-ss22-team-02/blob/master/.docs/images/johannes.png)    |
| Alwina Bitter | alwina.bitter@stud.uni-regensburg.de      |  ![](https://github.com/MME-Aufgaben-im-Sommer-2022/mme-ss22-team-02/blob/master/.docs/images/alia.jpg)|
<br>
  
Die Anwendung wurde gemeinsam in Coding-Sessions erarbeitet, welches eine genaue Aufteilung der erstallten Aufgabenbereiche der Teammitglieder erschwert.
