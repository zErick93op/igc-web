// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
 // Como aún no se tiene dominio, puedo usar el localhost solo para probar en local y ver si se genero
 // Lo dejare vacio hasta tener el dominio y luego ahi hacer un push ya con el dominio 
 //site: 'debo poner el dominio aqui',
 integrations: [
    sitemap()
 ]
});


