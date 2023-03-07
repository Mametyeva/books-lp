import UInput from "./UInput.vue";
import UGoods from "./UGoods.vue";
import USelectItem from "./USelectItem.vue";
import USelect from "./USelect.vue";

const components = [
    {name: 'UInput', component: UInput},
    {name: 'UGoods', component: UGoods},
    {name: 'USelectItem', component: USelectItem},
    {name: 'USelect', component: USelect},
];

export default {
    install(app) {
        components.forEach(({ name, component }) => {
            app.component(name, component)
        })
    }
};

