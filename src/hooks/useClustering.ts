import { CardItem, MarkerCondition } from "@/store/cards";




export type Cluster = {
  id: number;
  cardItems: CardItem[];
  condition: MarkerCondition;
}
export const useClustering = (cardList: CardItem[], minimalDestination: number) => {   
     const ids = cardList.map((card, index) => index);
     const weight = cardList.map((card) => 1);
   
     const findRoot = (x: number) => {
       if(x != ids[x]) { 
         x = ids[x];
         findRoot(x);
       }
       return x;
     }
   
     const union = (x: number, y: number) => {
       const rootX = findRoot(x);
       const rootY = findRoot(y);
       if (rootX !== rootY) {
         if(weight[rootX] < weight[rootY]) {
           ids[rootX] = rootY;
           weight[rootY] += weight[rootX];
         }
         else {
           ids[rootY] = rootX;
           weight[rootX] += weight[rootY];
         }
       } 
     }
   
   
   
     const ClusterMarkers = (): Cluster[] => {
       const clusters: { [key: number]: CardItem[] } = {};
   
       for(let i = 0; i < cardList.length; i++) {
         for(let j = i + 1; j < cardList.length; j++) {
           const distance = Math.sqrt(
             Math.pow(cardList[i].coordinates.lat - cardList[j].coordinates.lat, 2) +
             Math.pow(cardList[i].coordinates.lng - cardList[j].coordinates.lng, 2)
           );
           if (distance < minimalDestination) {
             union(i, j);
           }
         }
       }
   
       ids.forEach((id, index) => {
         if (!clusters[id]) {
           clusters[id] = [];
         }
         clusters[id].push(cardList[index]);
       });


       const arr = Object.values(clusters);
       const finalClusters = arr.map((cluster) => {
         const condition = MarkerCondition.DEFAULT;
         return {
           id: cluster[0].id,
           cardItems: cluster,
           condition: condition,
         };
       });
   
       return finalClusters;
     }

   return {
         ClusterMarkers,
         ids,
         weight,
         findRoot,
         union
   }
   
}