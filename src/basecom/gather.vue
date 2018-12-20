<template>
    <div class="porsche-article">
        <a @click="back" class="back"><i class="back-con"><img :src="require('../common/image/back.png')" alt=""></i></a>
        <div class="porsche-article-nr">
            <div class="parsche-offline-navigation">
                <ul>
                    <li>
                        <router-link :to="{ path: '/offline' }" class="navigation1"></router-link>
                        <span @click="tooffline()">活动招募</span>
                    </li>
                    <li>
                        <router-link :to="{ path: '/offlinehui' }" class="navigation2"></router-link>
                        <span @click="toofflinehui()">精彩集锦</span>
                    </li>
                </ul>
                <div class="block dataBox el-icon-date">
                </div>
            </div>

            <div class="porsche-article-nrleft">

                <div class="porsche-img">
                    <img style="width: 100%;" :src="PORSCHE_HOST + this.picture_path" alt="">
                    <h2 class="article-tit">{{this.title}}</h2>
                </div>


                <div class="article-nrleft" v-if="this.second_type != 'CONTENT'">
                    <div class="slide-article">
                        <div class="slide-article-left">

                            <div class="article-left-b">
                                <span class="applicants-map"></span>
                                <h5><span v-if="this.start_time != null || this.end_time">{{timedata(this.start_time)}}&nbsp;-&nbsp;{{timedata(this.end_time)}}</span></h5>
                                <h5 v-if="this.city != ''"><span>线下活动 - {{this.city}}</span><span style="padding-left: 10px;">{{this.maximum}}</span><span>人已上车</span></h5>
                            </div>
                        </div>
                        <div class="slide-article-right">
                            <div class="article-right-a">

                            </div>
                            <div class="article-right-like">
                                <div class="article-like">
                                    <img id="heart" v-if="this.upvote_status == 'N'" @click="tolike()" :src="require('../common/image/xinN.png')" alt="">
                                    <img id="heart" v-if="this.upvote_status == 'Y'" @click="tolike()"  :src="require('../common/image/xinY.png')" alt="">
                                    <span><span class="number-data">{{this.upvote_count+this.visit_count}}</span><span>&nbsp;人</span></span>
                                </div>
                                <div class="article-right-number">

                                </div>
                            </div>

                            <div class="article-right-b">
                                <a @click="tolike()" class="ui-btns btn-arrows but-col">感兴趣</a>

                            </div>
                        </div>
                        <div class="clear"></div>
                    </div>
                    <div class="slide-articleapp">
                        <div class="articleapp-left">
                            <div class="articleapp-left-a">
                                <span class="applicants-map"></span>
                                <div>
                                    <h5><span v-if="this.start_time != null || this.end_time">{{timedata(this.start_time)}}-{{timedata(this.end_time)}}</span></h5>
                                    <h5 v-if="this.city != ''">{{this.city}}</h5>
                                </div>
                            </div>
                            <div class="articleapp-left-b">
                               <span>{{this.maximum}}</span>人已上车
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="articleapp-right">
                            <div class="articleapp-right-a">
                                <div class="article-right-number">
                                    <div class="article-like">
                                        <img id="heart" v-if="this.upvote_status == 'N'" @click="tolike()" :src="require('../common/image/xinN.png')" alt="">
                                        <img id="heart" v-if="this.upvote_status == 'Y'" @click="tolike()"  :src="require('../common/image/xinY.png')" alt="">
                                        <!-- <h5 id="heart"></h5> -->
                                    </div>

                                    <span><span class="number-data">{{this.upvote_count+this.visit_count}}</span><span>&nbsp;人</span></span>
                                </div>
                            </div>
                            <div class="articleapp-right-b">
                                <!-- @click="participate()"-->
                                <!--<a  class="ui-btns btn-arrows but-col">{{this.registration}}</a>-->
                                <a class="ui-btns btn-arrows but-col" @click="tolike()">感兴趣</a>

                            </div>
                            <div class="clear"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="clear"></div>
            <div class="porsche-article-nrtext">
                <div class="article-nrtext" v-html="this.content"></div>
            </div>

            <!-- <a href="#" class="go-top"></a>-->
            <Comment :articleId="articleId"></Comment>
        </div>

    </div>
</template>

<script>
    import Comment from '@/basecom/commentfm.vue';
    import {PORSCHE_HOST} from '../common/js/host';
    export default {
        components:{
            Comment,
        },
        data(){
            return{
                articleId:'',
                fmList:[],
                num:'',
                id:'',
                type:'',
                content:'',
                picture_path:'',
                title:'',
                address:'',
                start_time:'',
                end_time:'',
                applicants:'6447',
                upvote_count:'',
                visit_count:'',
                active:'',
                uuids:'',
                city:"上海",
                first_type:'fm',
                second_type:'CONTENT',
                join_status:'',
                upvote_status:'',
                activity_is_end:'',
                PORSCHE_HOST,
                activeId:'',
                registration:'',
                small_title:'',
                maximum:'',




            }
        },
        methods:{
            back(){
                let _this = this;
                _this.$router.push('/offlinehui');
            },
            tooffline (){
                this.$router.push("/offline")
            },
            toofflinehui (){
                this.$router.push("/offlinehui")
            },
            timedata(time){
                return  new Date(time).getFullYear() + '/' + (new Date(time).getMonth() + 1) + '/' + new Date(time).getDate()
            },
            tofmdetail(){
                let _this = this;
                $.ajax({
                    type: 'post',
                    data: {
                        article_id:_this.num
                    },
                    url: PORSCHE_HOST+'/member/fm/detail',
                    success: function (res) {
                        if(res.code === "1004") {
                            _this.$router.push('/login');
                            return ;
                        }
                        if(res.code === "1001") {
                            console.log(res.data)
                            _this.id = res.data.uuid
                            _this.start_time = res.data.article.start_time
                            _this.end_time = res.data.article.end_time
                            //_this.address = res.data.article.address
                            _this.city = res.data.article.city
                            _this.small_title = res.data.article.small_title
                            _this.maximum = res.data.article.maximum
                            _this.picture_path = res.data.article.picture_path
                            _this.title = res.data.article.title
                            _this.first_type = res.data.article.first_type
                            _this.second_type = res.data.article.second_type
                            _this.content = res.data.article.content
                            _this.applicants = res.data.article.join_count
                            _this.upvote_count = res.data.article.upvote_count
                            _this.active = res.data.article.active
                            _this.visit_count = res.data.article.visit_count
                            _this.join_status = res.data.join_status
                            _this.upvote_status = res.data.upvote_status
                            _this.activity_is_end = res.data.activity_is_end
                            _this.activeId = res.data.article.id
                            _this.registration = res.data.registration

                            _this.uuids = res.data.jingcai ? res.data.jingcai.uuid : ''

                        }
                        if(res.code === "1002" || res.code === "1003" || res.code === "1009") {
                            alert(res.message);
                            return false;
                        }
                    },
                    error: function (res) {
                        console.log("网络连接错误!")
                    }
                });
            },
            participate (){
                let _this = this;
                $.ajax({
                    type: 'post',
                    data: {
                        article_id:_this.num
                    },
                    url: PORSCHE_HOST+'/member/fm/apply',
                    success: function (res) {
                        if(res.code === "1004") {
                            _this.$router.push('/login');
                            return ;
                        }
                        if(res.code === "1001") {
                            _this.join_status = 'Y'
                            console.log("res"+res.data)
                            _this.applicants =   res.data.join_count
                        }
                        if(res.code === "1002" || res.code === "1003" || res.code === "1009") {
                            alert(res.message);
                            return false;
                        }
                    },
                    error: function (res) {
                        console.log("网络连接错误!")
                    }
                });
            },


            tolike(){
                let _this = this;
                var urlshash = window.location.hash;
                var urlspathname = window.location.pathname;
                var urls = urlspathname+urlshash
                $.ajax({
                    type: 'post',
                    data: {
                        article_id:_this.num,
                        visit_url:urls.toString()
                    },
                    url: PORSCHE_HOST+'/member/fm/article/upvote',
                    success: function (res) {
                        if(res.code === "1004") {
                            _this.$router.push('/login');
                            return ;
                        }
                        if(res.code === "1001") {
                            console.log(res.data.upvote_status);
                            _this.upvote_status =   res.data.upvote_status

                            _this.upvote_count = res.data.upvote_count
                        }
                        if(res.code === "1002" || res.code === "1003" || res.code === "1009") {
                            alert(res.message);
                            return false;
                        }
                    },
                    error: function (res) {
                        console.log("网络连接错误!")
                    }
                });
            },
            setVisiturl(){
                var urlshash = window.location.hash;
                var urlspathname = window.location.pathname;
                var urls = urlspathname+urlshash
                let _this = this;
                $.ajax({
                    type: 'post',
                    data:{
                        article_id:_this.num,
                        visit_url:urls.toString()
                    },
                    url: PORSCHE_HOST+'/member/visit/record/add',
                    success: function (res) {
                        if(res.code === "1004") {
                            _this.$router.push('/login');
                            return ;
                        }
                        if(res.code === "1001") {
                            // alert(res.message);
                        }
                        if(res.code === "1002" || res.code === "1003" || res.code === "1009") {
                            alert(res.message);
                            return false;
                        }
                    },
                    error: function (res) {
                        console.log("网络连接错误!")
                    }
                });
            }
        },
        mounted(){
            this.num = this.$route.params.num
            this.articleId = this.$route.params.num
            this.tofmdetail();
            this.setVisiturl()
        },
        created() {
            this.articleId = this.$route.params.num
        }


    }
</script>

<style scoped>
    .dataBox {
        content: "";
        background:url('../common/image/rili2.png')  no-repeat;
        background-size: 80% 80%;
        width: 25px;
        height: 32px;
        display: flex;
        position: absolute;
        padding: 4px 10px 4px 0px;
    }



    .slide-article {
        display: block;
    }
    .slide-articleapp {
        display: none;
    }
    .article-nrtext img {
        width: 100%;
        display:block;
    }
    .porsche-article-nrtext {
        margin: 20px 0;
    }
    .article-right-like h5 {
        font-size: 13px;
    }
    .article-like {
        margin-bottom: 5px;
        margin-right: 10px;
        margin-top:10px;
    }
    #heart {
        position: relative;
        height: 20px;
        width: 26px;
        margin-left: auto;
        margin-right: auto;
    }

    #heart:after {
        left: 0;
        transform: rotate(45deg);
        transform-origin: 100% 100%;
    }
    .article-right-like {
        margin-left: 15px;
        text-align: center;
        cursor: pointer;
    }
    .article-right-b {
        /*margin-right: 15px;*/
    }
    .btn-arrows:after {
        content: "";
        border: 5px solid transparent;
        width: 0;
        height: 0;
        display: inline-block;
        border-left-color: #fff;
        position: absolute;
        right: 10px;
        top: 50%;
        margin-top: -5px;
    }
    .ui-btns {
        color: #fff;
        width: 150px;
        font-size: 18px;
        text-align: center;
        height: 38px;
        line-height: 40px;
        background: #313639;
        display: inline-block;
        cursor: pointer;
        border: 0 none;
        padding: 0;
        position: relative;
    }


    .number-data {
        font-size: 28px!important;
        color: #000;
    }
    .applicants-map {
        position: absolute;
        padding: 0px 5px 0px 0;
    }
    .applicants-map:before {
        content: "";
        background:url('../common/image/pcimg/xxhd-map.png') 100% no-repeat;
        width: 25px;
        height: 32px;
        display: flex;
        position: relative;
        padding: 4px 10px 4px 0px;
    }
    .article-right-number {
        margin-bottom: 5px;
    }
    .article-right-a {
        margin-right: 15px;
    }
    .slide-article-right {
        float: right;
        display: flex;
    }
    .article-left-b h5{
        font-size: 14px;
        color: #000;
        line-height: 21px;
        padding-left: 45px;
    }
    .article-left-a span:last-child{
        font-size: 18px;
        font-weight: bold;
        color: #000;
        position: relative;
        top: 7px;
    }
    .article-left-a {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 15px;
    }
    .slide-article-left {
        float: left;
        display: flex;
    }
    .slide-article-right {
        float: right;
        display: flex;
    }
    .slide-article {
        padding: 15px 0px;
    }

    .porsche-article-nr {
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;

        width: 100%;
    }

    /*.go-top{
        position: fixed;
        right: 10px;
        bottom: 10px;
        display: block;
        width: 30px;
        height: 30px;
        background: red;
    }*/
    .parsche-offline-navigation {
        width: 100%;
        /*overflow: hidden;*/
        height: auto;
        position: relative;
    }
    .parsche-offline-navigation ul{
        display: flex;
        margin: 0px!important;
        background: #eff0f1;
    }

    .parsche-offline-navigation ul li{
        width: 46.5%;
        height: 55px;
        line-height: 55px;
        text-align: center;
    }
    .parsche-offline-navigation ul li a{
        display: block;
        cursor: pointer;
    }
    .swiper-pagination {
        display: none;
    }
    .parsche-offline-navigation ul li span{
        position: relative;
        top: -55px;
        color: #000;
        cursor: pointer;
    }

    .parsche-offline-navigation ul li:last-child span{
        position: relative;
        top: -55px;
        color: #fff;

    }
    .navigation1 {
        border-bottom: 55px solid #eff0f1;
        border-left: 0px solid #eff0f1;
        border-right: 55px solid #eff0f1;
    }
    .navigation2 {
        border-bottom: 55px solid #950014;
        border-left: 20px solid #950014;
        border-right: 55px solid #950014;
    }
    .porsche-img{
        position: relative;
    }
    .porsche-article-nrleft .article-tit{
        line-height: 55px;
        width: 100%;
        font-size: 14px;
        color: #fff;
        text-align: left;
        position: absolute;
        background: #000000;
        background-color: rgba(0,0,0,.3);
        width: 100%;
        bottom: 3px;
        text-indent: 15px;

    }
    @media (max-width: 768px) {
        .parsche-offline-navigation ul li{
            width: 42%;
            height: 55px;
            line-height: 55px;
            text-align: center;
        }
        .porsche-article-nr {
            line-height: 24px;
        }
        .porsche-img{
            position: relative;
        }
        .porsche-article-nrleft .article-tit{
            line-height: 35px;
            width: 100%;
            font-size: 14px;
            color: #fff;
            text-align: left;
            position: absolute;
            background: #000000;
            background-color: rgba(0,0,0,.3);
            width: 100%;
            bottom: 6px;
            text-indent: 15px;

        }
        .ui-btns {
            width: 120px;
            height: 26px;
            line-height: 28px;
            font-size: 13px;
        }
        .applicants-map {
            position: relative;
            float: left;
            padding: 0px 5px 0px 0;
        }
        .applicants-map:before {
            content: "";
            background:url('../common/image/pcimg/xxhd-map.png') 100% no-repeat;
            width: 25px;
            height: 32px;
            display: flex;
            position: relative;
            padding: 4px 10px 4px 0px;
        }

        .articleapp-left {
            position: relative;
            padding: 15px 0px;
            width: 65%;
            float: left ;
        }
        .articleapp-left-a {

        }
        .articleapp-left-b {
            padding-left: 10px;

        }
        .number-data {
            font-size: 18px!important;
        }
        .article-right-number span {
            font-size: 12px;
        }
        .article-right-number {
            margin-bottom: 0px;
        }

        .articleapp-right {
            position: relative;
            padding: 15px 0px;
            font-size: 13px;
            width: 35%;
            float: right;
            text-align: right;
        }
        .articleapp-right-a {
            padding-right: 10px;
        }
        .articleapp-right-b {
            padding-right: 10px;
            margin-top: 10px;
        }

        .article-like {
            margin-bottom: 0px;
            display: inline-block;
        }
        .slide-articleapp {
            display:block;
        }
        .slide-article {
            display: none;
        }
    }
</style>
