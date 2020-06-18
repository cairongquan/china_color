var eventHub = new Vue();


var vm = new Vue({
    el: '#left_btn',
    data: {
        colors: []
    },
    methods: {
        change: function (hex, name, eName, rgb) {
            var color = {
                hex,
                name,
                eName,
                rgb
            }
            eventHub.$emit('change1', color);
        },
        mouseleave: function (e) {
            e.target.style.animationName = 'a_small';
        },
        mouseenter: function (e) {
            e.target.style.animationName = 'a_big';
        },
        getColor: async function () {
            var colors = await axios.get('http://www.warrior.cool:2902/color');
            this.colors = colors.data;
        }
    },
    mounted() {
        this.getColor();
    },
})

var app = new Vue({
    el: '#app',

    data: {
        colorEname: 'DarkColor',
        colorName: '墨色',
        colorHex: '#50616d',
        colorRgb: '80, 97, 109'
    },
    mounted() {
        eventHub.$on('change1', (val) => {
            this.colorRgb = val.rgb;
            this.colorName = val.name;
            this.colorHex = val.hex;
            this.colorEname = val.eName;
            document.body.style.backgroundColor = val.hex;
        })
    }
})