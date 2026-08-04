import QtQuick
import QtQuick.Controls
import QtQuick.Layouts

ApplicationWindow {
    id: fenetre
    visible: true
    width: 460
    height: 660
    title: "Pokédex"

    // Composant réutilisable : une ligne de statistique avec barre animée
    component StatLigne: RowLayout {
        id: ligne
        property string libelle: ""
        property color couleur: "#78C850"
        property int valeur: 0
        property int maxi: 255
        Layout.fillWidth: true
        spacing: 8

        Label {
            text: ligne.libelle
            color: "#333"; font.pixelSize: 13
            Layout.preferredWidth: 80
        }
        Rectangle {
            id: fond
            Layout.fillWidth: true
            height: 18; radius: 9; color: "#e3e3e3"
            Rectangle {
                height: parent.height; radius: 9; color: ligne.couleur
                width: fond.width * ligne.valeur / ligne.maxi
                Behavior on width { NumberAnimation { duration: 450; easing.type: Easing.OutCubic } }
            }
        }
        Label {
            text: ligne.valeur
            color: "#333"; font.pixelSize: 13
            Layout.preferredWidth: 34
            horizontalAlignment: Text.AlignRight
        }
    }

    // Fond en dégradé
    Rectangle {
        anchors.fill: parent
        gradient: Gradient {
            GradientStop { position: 0.0; color: "#2b5876" }
            GradientStop { position: 1.0; color: "#4e4376" }
        }
    }

    ColumnLayout {
        anchors.fill: parent
        anchors.margins: 18
        spacing: 12

        // Recherche
        RowLayout {
            Layout.fillWidth: true
            TextField {
                objectName: "recherche"
                Layout.fillWidth: true
                placeholderText: "Numéro ou nom..."
            }
            Button { objectName: "btn_rechercher"; text: "Chercher" }
        }

        // Carte
        Rectangle {
            Layout.fillWidth: true
            Layout.fillHeight: true
            radius: 20
            color: "#f7f7f7"

            ColumnLayout {
                anchors.fill: parent
                anchors.margins: 18
                spacing: 8

                Label { objectName: "numero"; text: "N°000"; color: "#999"; font.pixelSize: 15; Layout.alignment: Qt.AlignHCenter }
                Label { objectName: "nom"; text: "?"; color: "#222"; font.pixelSize: 30; font.bold: true; Layout.alignment: Qt.AlignHCenter }

                Image {
                    objectName: "sprite"
                    source: ""
                    Layout.alignment: Qt.AlignHCenter
                    Layout.preferredWidth: 180
                    Layout.preferredHeight: 180
                    fillMode: Image.PreserveAspectFit
                    smooth: false
                }

                // Badges de type
                RowLayout {
                    Layout.alignment: Qt.AlignHCenter
                    spacing: 8
                    Rectangle {
                        objectName: "badge1"; radius: 13; color: "#999"
                        implicitWidth: t1.implicitWidth + 26; implicitHeight: 28
                        Label { objectName: "badge1_txt"; id: t1; anchors.centerIn: parent; text: ""; color: "white"; font.bold: true; font.pixelSize: 13 }
                    }
                    Rectangle {
                        objectName: "badge2"; radius: 13; color: "#999"; visible: false
                        implicitWidth: t2.implicitWidth + 26; implicitHeight: 28
                        Label { objectName: "badge2_txt"; id: t2; anchors.centerIn: parent; text: ""; color: "white"; font.bold: true; font.pixelSize: 13 }
                    }
                }

                Item { Layout.preferredHeight: 6 }

                // Statistiques (barres animées)
                StatLigne { objectName: "stat_pv";  libelle: "PV";          couleur: "#78C850" }
                StatLigne { objectName: "stat_atk"; libelle: "Attaque";     couleur: "#F08030" }
                StatLigne { objectName: "stat_def"; libelle: "Défense";     couleur: "#F8D030" }
                StatLigne { objectName: "stat_ats"; libelle: "Atq. Spé.";   couleur: "#6890F0" }
                StatLigne { objectName: "stat_dfs"; libelle: "Déf. Spé.";   couleur: "#78C850" }
                StatLigne { objectName: "stat_vit"; libelle: "Vitesse";     couleur: "#F85888" }

                Item { Layout.fillHeight: true }
            }
        }

        // Navigation
        RowLayout {
            Layout.fillWidth: true
            spacing: 10
            Button { objectName: "btn_prec"; text: "◀ Précédent"; Layout.fillWidth: true }
            Button { objectName: "btn_suiv"; text: "Suivant ▶"; Layout.fillWidth: true }
        }
    }
}
