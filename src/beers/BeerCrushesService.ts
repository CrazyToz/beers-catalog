import { Beer } from './Beer';

export class BeerCrushesService {

    private beers: Beer[] = [];

    public push(beer: Beer): void {
        for (const myBeer of this.beers) {
            if (myBeer.id === beer.id) {
                return;
            }
        }
        this.beers.push(beer);
    }

    public pop(beer: Beer): Beer | null {
        for (const [index, currentBeer] of this.beers.entries()) {
            if (currentBeer.id === beer.id) {
                this.beers.splice(index, 1);
                return beer;
            }
        }
        return null;
    }

    public isCrush(beer: Beer): boolean {
        for (const myBeer of this.beers) {
            if (beer.id === myBeer.id) {
                return true;
            }
        }
        return false;
    }

    public myBeers(): Beer[] {
        return this.beers;
    }
}

export const beerCrushesService: BeerCrushesService = new BeerCrushesService();
