const tableau = [10, 20, 30, 40, 50];

const moyenne = tableau.reduce((accumulateur, élémentCourant) => {
  return accumulateur + élémentCourant;
}, 0) / tableau.length;

console.log(moyenne); // Affiche 30 (moyenne des valeurs du tableau)

ratings.filter(rating => ratings.grade)