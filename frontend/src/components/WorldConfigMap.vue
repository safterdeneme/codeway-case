<template>
  <div class="worldmap-container">
    <vue-world-map
      id="worldmap"
      :countryData="visitedCountries"
      :defaultCountryFillColor="map.defaultCountryFillColor"
      :highColor="map.highColor"
      :countryStrokeColor="map.countryStrokeColor"
      :lowColor="map.lowColor"
      @mouseover-country="handleMouseOver"
      @mouseout-country="handleMouseOut"
    ></vue-world-map>
    <div v-if="hoveredCountry" class="country-info">
      <div>{{ hoveredCountry }}</div>
      <ul>
        <li v-for="(value, key) in countryConfigs[hoveredCountry]" :key="key"><span>{{ key }}</span>: {{ value }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import VueWorldMap from "vue-world-map";
import { serveConfig } from '../services/apiService';

export default {
  name: 'WorldConfigMap',
  components: {
    VueWorldMap
  },
  data() {
    return {
      allCountries: ['TR', 'US', 'DE', 'FR'],
      visitedCountries: {},
      hoveredCountry: null,
      countryConfigs: {},
      map: {
        defaultCountryFillColor: '#333',
        highColor: '#00d1b2',
        lowColor: '#888',
        countryStrokeColor: '#333'
      }
    };
  },
  mounted() {
    this.paintCountries();
    this.addHoverListeners();
  },
  methods: {
    paintCountries() {
      this.visitedCountries = this.allCountries.reduce((acc, country) => {
        acc[country] = {
          fill: '#888'
        };
        return acc;
      }, {});
    },
    addHoverListeners() {
      this.$nextTick(() => {
        const mapElement = this.$el.querySelector('#worldmap');
        if (mapElement) {
          mapElement.addEventListener('mouseover', this.handleMouseOver);
          mapElement.addEventListener('mouseout', this.handleMouseOut);
        }
      });
    },
    async handleMouseOver(event) {
      const countryId = event.target.id;
      if (this.allCountries.includes(countryId)) {
        this.hoveredCountry = countryId;
        if (!this.countryConfigs[countryId]) {
          const countryConfigs = await serveConfig(countryId);
          this.$set(this.countryConfigs, countryId, countryConfigs);
        }
      }
    },
    handleMouseOut(event) {
      const countryId = event.target.id;
      if (this.allCountries.includes(countryId)) {
        this.hoveredCountry = null;
      }
    }
  }
};
</script>

<style scoped>
.worldmap-container {
  width: 60rem;
  margin: 0 auto;
}

.country-info {
  position: fixed;
  border: 1px solid #ddd;
  color: white;
  background-color: #333;
  padding: 10px;
  border-radius: 5px;
  z-index: 1000;
  top: 5%;
  left: 0rem;
  margin: 2rem;

  span {
  display: inline;
  color: #00d1b2;
  font-weight: 900;
  }
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: revert-layer;
  flex-direction: column;
  text-align: justify;
}


.vue-world-map #US {
    fill: #00d1b2;
}


</style>
