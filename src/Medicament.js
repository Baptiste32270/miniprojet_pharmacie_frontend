export class Medicament {
    constructor(nom, reference, quantiteParUnite, unitesEnStock, prixUnitaire, imageURL) {
        this.nom = nom;
        this.reference = reference;
        this.quantiteParUnite = quantiteParUnite;
        this.unitesEnStock = unitesEnStock;
        this.prixUnitaire = prixUnitaire;
        this.imageURL = imageURL;
    }

    get prixFormate() {
        return `${this.prixUnitaire.toFixed(2)} €`;
    }

    toString() {
        return `Médicament: ${this.nom} (Réf: ${this.reference})`;
    }
}