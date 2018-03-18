import { $http, HttpResponse } from 'vue-resource';
import { Vue } from 'vue-property-decorator';
import { Beer, Methods } from './Beer';

export interface BeerRestError {
    statusCode: number;
    error: string;
    humanReadableMessage: string;
}

export class BeerRestService extends Vue {

    private URI_BASE_PATH: string = 'https://api.punkapi.com/v2';

    public findBeers(page: number): PromiseLike<Beer[]> {
        const uri = this.URI_BASE_PATH + '/beers?per_page=80&page=' + page;
        return this.$http
            .get(uri)
            .then((response: HttpResponse) => {
                const beers: Beer[] = response.data.map(this.toBeer);
                return beers;
            });
    }

    public findBeer(identifier: string): PromiseLike<Beer> {
        const uri = this.URI_BASE_PATH + '/beers/' + identifier;
        return this.$http
            .get(uri)
            .then(
                (response: HttpResponse) => {
                    return this.toBeer(response.data[0]);
                },
                (response: HttpResponse) => {
                    return Promise.reject(this.toError(response));
                },
            );
    }

    private toBeer(item: any): Beer {
        const beer: Beer = {
            id: item.id,
            name: item.name,
            description: item.description,
            tagLine: item.tagline,
            imageUrl: item.image_url,
            firstBrewed: item.first_brewed,
            foodPairing: item.food_pairing,
            abv: item.abv,
            ibu: item.ibu,
            ingredients: item.ingredients,
            methods: toMethods(item.method),
            brewingTips: item.brewers_tips,
        };
        return beer;

        function toMethods(methods: any): Methods {
            return {
                mashing: {
                    temperature: methods.mash_temp[0].temp,
                    duration: methods.mash_temp[0].duration,
                },
                fermentation: {
                    temperature: methods.fermentation.temp,
                    duration: methods.fermentation.duration,
                },
            };
        }
    }

    private toError(response: any): BeerRestError {
        const error: BeerRestError = {
            statusCode: response.status,
            error: response.error,
            humanReadableMessage: response.message,
        };
        return error;
    }
}

export const beerService: BeerRestService = new BeerRestService();
