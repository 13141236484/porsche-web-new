<template lang="html">
    <div class="porsche-reserve">
        <a @click="back" class="back"><i class="back-con"><img :src="require('../../common/image/back.png')" alt=""></i></a>
        <div class="reserve-top">
            <img class="cover"  style="width: 100%;;height:100%;display: block;"  :src="reserveimg" alt="">
        </div>
        <div class="parsche-offline-bottom">
            <div class="offline-bottom">
                <router-link  :to="{ path: '/dealer' }" class="bottom-a">经销商查询</router-link>
                <router-link  :to="{ path: '/testdrive' }"class="bottom-a">预约试驾</router-link>
            </div>
        </div>
    </div>
</template>

<script scoped>

    import {PORSCHE_HOST} from '../../common/js/host';

    export default {
        components: {

        },
        data() {
            return {
                reserveimg:"",
            }
        },
        methods: {
            back(){
                let _this = this;
                _this.$router.push('/home');
            },
            show() {
                let l_height = $(window).height();
                let zongpc_height = parseInt(l_height) - parseInt(131);
                if (document.body.offsetWidth > 750) {
                    this.reserveimg = require('../../common/image/pcimg/reserve.jpg');
                    $(".reserve-top").height(zongpc_height)
                } else {
                    this.reserveimg = require('../../common/image/appimg/reserve.jpg');
                }
            },

        },
        mounted() {
            this.show()
        },
        created() {

        }
    }
</script>

<style scoped>


    .reserve-top {
        position: relative;
        height: auto;
        overflow: hidden;
    }
    .parsche-offline-bottom {
        position: absolute;
        top: 23%;
        padding:25px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
    .offline-bottom .bottom-a:first-child {
        margin-right: 0px;
        margin-bottom: 40px;
    }
    .offline-bottom .bottom-a:last-child{
        margin-left: 0px;
    }
    .bottom-a {
        text-align: center;
        width: 365px;
        height: 50px;
        line-height: 50px;
        color: #fff;
        font-size: 18px;
        display: block;
        border: 1px solid #fff;
        letter-spacing: 2px;
    }

    @media (max-width: 768px) {

        .bottom-a {
            text-align: center;
            width: 265px;
            height: 40px;
            line-height: 40px;
            color: #fff;
            font-size: 16px;
            display: block;
            border: 1px solid #fff;
            letter-spacing: 2px;

        }

    }
</style>
