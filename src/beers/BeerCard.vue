<template>
    <v-card color="grey lighten-2">
        <v-card-media :src="beer.imageUrl" contain height="125px"></v-card-media>
        <v-card-title>
            <div>
                <h3>{{beer.name}}</h3>
                <div>
                    {{beer.description}}
                </div>
            </div>
        </v-card-title>
    </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Beer } from '@/beers/Beer';

@Component
export default class BeerCard extends Vue {

    @Prop({required : true})
    private beer !: Beer;

}
</script>

