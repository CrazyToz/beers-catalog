<template>
    <v-card color="teal lighten-5">
        <v-container fluid>
            <v-layout row wrap>
                <v-flex xs3>
                    <v-card-media :src="beer.imageUrl" contain height="125px"></v-card-media>
                </v-flex>
                <v-flex xs9>
                    <v-card-title>
                        <v-layout column>
                            <div class="headline">{{ beer.name }}</div>
                            <div>{{ beer.tagLine }}</div>
                        </v-layout>
                    </v-card-title>
                </v-flex>
            </v-layout>
        </v-container>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="teal">
                Details
            </v-btn>
            <v-btn icon v-on:click="toggleCrush()">
                <v-icon :color="crush ? 'red' : 'black'">
                    favorite
                </v-icon>
            </v-btn>
            <v-btn icon v-on:click="showText = !showText">
                <v-icon>
                    {{ showText ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}
                </v-icon>
            </v-btn>
        </v-card-actions>
        <v-slide-y-transition>
          <v-card-text v-show="showText">
              {{ beer.description    }}
           </v-card-text>
        </v-slide-y-transition>
    </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Beer } from '@/beers/Beer';

@Component
export default class BeerCard extends Vue {

    @Prop({required : true})
    private beer !: Beer;

    @Prop({default: false})
    private favored !: boolean;

    private showText: boolean = false;

    private crush : boolean = false;

    public created() {
        if (this.favored === true) {
            this.crush = this.favored;
        }
    }

    public toggleCrush() {
        this.crush = !this.crush;
        this.$emit('crush', this.crush, this.beer);
    }
}
</script>

