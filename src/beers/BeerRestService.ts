import { $http, HttpResponse } from 'vue-resource';
import { Vue } from 'vue-property-decorator';
import { Beer } from './Beer';

export class BeerRestService extends Vue {

    public findBeers(page: number) {
        const uri = 'https://api.punkapi.com/v2/beers?per_page=80&page=' + page;
        return this.$http
            .get(uri)
            .then((response: HttpResponse) => {
                const beers: Beer[] = response.data.map((item: any) => {
                    const beer: Beer = {
                        id: item.id,
                        name: item.name,
                        description: item.description,
                        tagLine: item.tagline,
                        imageUrl: item.image_url,
                    };
                    return beer;
                });
                return beers;
            });
    }

}

export const beerService: BeerRestService = new BeerRestService();
