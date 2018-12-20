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
                      <h5>
                          <span v-if="this.city != ''">{{this.active}} - {{this.city}}</span>
                          <span v-if="(this.registration == '正在报名' || this.registration == '取消报名' || this.registration == '感兴趣') && (this.set_join_count == '0'  && this.set_maximum == '0')" style="padding-left: 10px;">{{this.applicants}}/{{this.maximum}}人已上车,精彩即将开启</span>
                          <span v-if="(this.registration == '报名已结束' || this.registration == '活动已结束' || this.registration == '精彩回顾') && (this.set_join_count == '0' && this.set_maximum == '0')" style="padding-left: 10px;">{{this.applicants}}/{{this.maximum}}人已上车,报名已结束</span>
                          <span v-if="(this.registration == '正在报名' || this.registration == '取消报名' || this.registration == '感兴趣') && (this.set_join_count !='0' && this.set_maximum != '0')" style="padding-left: 10px;">{{this.set_join_count}}/{{this.set_maximum}}人已上车,精彩即将开启</span>
                          <span v-if="(this.registration == '报名已结束' || this.registration == '活动已结束' || this.registration == '精彩回顾') && (this.set_join_count !='0' && this.set_maximum != '0')" style="padding-left: 10px;">{{this.set_join_count}}/{{this.set_maximum}}人已上车,报名已结束</span>
                         <!-- <span v-if="(this.registration == '正在报名' || this.registration == '取消报名' || this.registration == '感兴趣') && (this.ids != '270' && this.ids != '369')" style="padding-left: 10px;">{{this.applicants}}/{{this.maximum}}人已上车,精彩即将开启</span>
                          <span v-if="(this.registration == '正在报名' || this.registration == '取消报名' || this.registration == '感兴趣') && this.ids == '270'" style="padding-left: 10px;">10/30人已上车,精彩即将开启</span>
                          <span v-if="(this.registration == '正在报名' || this.registration == '取消报名' || this.registration == '感兴趣') && this.ids == '369'" style="padding-left: 10px;">12/30人已上车,精彩即将开启</span>
                          <span v-if="(this.registration == '报名已结束' || this.registration == '活动已结束' || this.registration == '精彩回顾') && (this.ids != '270' && this.ids != '369')" style="padding-left: 10px;">{{this.applicants}}/{{this.maximum}}人已上车,报名已结束</span>
                          <span v-if="(this.registration == '报名已结束' || this.registration == '活动已结束' || this.registration == '精彩回顾') && this.ids == '270'" style="padding-left: 10px;">10/30人已上车,报名已结束</span>
                          <span v-if="(this.registration == '报名已结束' || this.registration == '活动已结束' || this.registration == '精彩回顾') && this.ids == '369'" style="padding-left: 10px;">12/30人已上车,报名已结束</span>-->
                      </h5>
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
                          <a v-if="this.registration == '报名未开始' "  @click="applyQuota()" class="ui-btns btn-arrows but-col">感兴趣</a>
                          <a v-if="this.registration == '正在报名' && this.is_start_signup == '0'"  @click="applyQuota()" class="ui-btns btn-arrows but-col">感兴趣</a>
                          <a v-if="this.registration == '正在报名' && this.is_start_signup == '1'"  @click="applyQuota()" class="ui-btns btn-arrows but-col">报名</a>
                          <a v-if="this.registration == '取消报名'" @click="applyQuota()"  class="ui-btns btn-arrows but-col lsss">取消报名</a>
                          <a v-if="this.registration == '感兴趣'" @click="applyQuota()"  class="ui-btns btn-arrows">感兴趣</a >
                          <a v-if="this.registration == '报名已结束'" @click="applyQuota()"  class="ui-btns btn-arrows">感兴趣</a >
                          <a v-if="this.registration == '活动已结束'" @click="applyQuota()"  class="ui-btns btn-arrows">感兴趣</a >
                          <a v-if="this.registration == '精彩回顾'" @click="applyQuota()"  class="ui-btns btn-arrows">精彩回顾</a >
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

                          <span v-if="(this.registration == '正在报名' || this.registration == '取消报名' || this.registration == '感兴趣') && (this.set_join_count == '0' && this.set_maximum == '0')">{{this.applicants}}/{{this.maximum}}人已上车,精彩即将开启</span>
                          <span v-if="(this.registration == '报名已结束' || this.registration == '活动已结束' || this.registration == '精彩回顾') && (this.set_join_count == '0' && this.set_maximum == '0')">{{this.applicants}}/{{this.maximum}}人已上车,报名已结束</span>
                          <span v-if="(this.registration == '正在报名' || this.registration == '取消报名' || this.registration == '感兴趣') && (this.set_join_count !='' && this.set_maximum != '')">{{this.set_join_count}}/{{this.set_maximum}}人已上车,精彩即将开启</span>
                          <span v-if="(this.registration == '报名已结束' || this.registration == '活动已结束' || this.registration == '精彩回顾') && (this.set_join_count !='' && this.set_maximum != '')">{{this.set_join_count}}/{{this.set_maximum}}人已上车,报名已结束</span>
                          <!--<span v-if="(this.registration == '正在报名' || this.registration == '取消报名' || this.registration == '感兴趣') && (this.ids != '270' && this.ids != '369')">{{this.applicants}}/{{this.maximum}}人已上车,精彩即将开启</span>
                          <span v-if="(this.registration == '正在报名' || this.registration == '取消报名' || this.registration == '感兴趣') && this.ids == '270'">10/30人已上车,精彩即将开启</span>
                          <span v-if="(this.registration == '正在报名' || this.registration == '取消报名' || this.registration == '感兴趣') && this.ids == '369'">12/30人已上车,精彩即将开启</span>
                          <span v-if="this.registration == '报名已结束' || this.registration == '活动已结束' || this.registration == '精彩回顾'">{{this.applicants}}/{{this.maximum}}人已上车,报名已结束</span>-->
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

                          <!--<a  class="ui-btns btn-arrows but-col">{{this.registration}}</a>-->
                          <a v-if="this.registration == '报名未开始'"  @click="applyQuota()" class="ui-btns btn-arrows but-col">感兴趣</a>
                          <a v-if="this.registration == '正在报名' && this.is_start_signup == '0'"  @click="applyQuota()" class="ui-btns btn-arrows but-col">感兴趣</a>
                          <a v-if="this.registration == '正在报名' && this.is_start_signup == '1'"  @click="applyQuota()" class="ui-btns btn-arrows but-col">报名</a>
                          <a v-if="this.registration == '取消报名'" @click="applyQuota()"  class="ui-btns btn-arrows but-col lsss">取消报名</a>
                          <a v-if="this.registration == '感兴趣'" @click="applyQuota()"   class="ui-btns btn-arrows">感兴趣</a >
                          <a v-if="this.registration == '报名已结束'" @click="applyQuota()"  class="ui-btns btn-arrows">感兴趣</a >
                          <a v-if="this.registration == '活动已结束'" @click="applyQuota()"  class="ui-btns btn-arrows">感兴趣</a >
                          <a v-if="this.registration == '精彩回顾'" @click="applyQuota()"  class="ui-btns btn-arrows">精彩回顾</a >
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
      <Comment :articleId="articleId"></Comment>
    </div>
    <!--新的活动须知-->
    <el-dialog
            title="活动须知"
            :visible.sync="ActiveDialogVisible"
            :close-on-click-modal="false"
            :append-to-body='true'
            :width="ActivityWidth"
            center>
        <div class="rollingBox" v-html="this.notes"></div>
        <p class="forecast-explain">*以实际活动现场情况为准，解释权归保时捷中国所有</p>
        <p class="forecast-agree">
            <el-checkbox v-model="read" name="gender">我已知悉以上活动须知并确认报名</el-checkbox>
        </p>
        <p class="verification" v-text="this.verification"></p>
        <span slot="footer" class="dialog-footer">
            <el-button type="info" @click="immediately()">即刻上车</el-button>
        </span>
    </el-dialog>
    <!--新的活动须知-->
    <!--新的报名-->
    <el-dialog
            :visible.sync="SignUpDialogVisible"
            :close-on-click-modal="false"
            :append-to-body='true'
            :width="ActivityWidth"
            center
            class="infoDialog">
        <p class="data-data">以下信息为您在个人中心的预留信息，请确认完成活动报名，如与实际情况不符可手动编辑修改，挚享汇将为您同步至个人中心。</p>
        <p class="data-data">感谢您对保时捷的信任与热爱，挚享汇期待与您相约无限精彩。</p>
        <el-scrollbar style="height: 220px;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="mini" label-width="110px" class="demo-ruleForm">

                <el-form-item label="姓" prop="surname" :label-width="formLabelWidth">
                    <el-input v-model="ruleForm.surname" placeholder="请输入姓"></el-input>
                </el-form-item>
                <el-form-item label="名" prop="name" :label-width="formLabelWidth">
                    <el-input v-model="ruleForm.name" placeholder="请输入名"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="tel_phone" :label-width="formLabelWidth">
                    <el-input v-model="ruleForm.tel_phone" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="code" :label-width="formLabelWidth">
                    <el-input v-model="ruleForm.code" placeholder="请输入验证码"></el-input>
                    <el-button class="getcode" v-show="show" @click="getcode">{{codeValue}}</el-button>
                    <el-button class="count getcode" v-show="!show" @click="getcode">{{count}}s</el-button>
                </el-form-item>
                <el-form-item label="微信号" :prop="(ruleForm.iswechat_number === 1) || (ruleForm.iswechat_number === 0) ? '' : 'wechat_number'" :label-width="formLabelWidth" v-show="ruleForm.iswechat_number != 0">
                    <el-input v-model="ruleForm.wechat_number" placeholder="请输入微信号"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱" :prop="(ruleForm.isemail === 1) || (ruleForm.isemail ===0) ? '' : 'email'" :label-width="formLabelWidth" v-show="ruleForm.isemail != 0">
                    <el-input v-model="ruleForm.email" placeholder="请输入电子邮箱"></el-input>
                </el-form-item>
                <el-form-item label="协同人员" :prop="(ruleForm.issynergetic_surname === 1) || (ruleForm.issynergetic_surname ===0) ? '' : 'synergetic_surname'" :label-width="formLabelWidth" v-show="ruleForm.issynergetic_surname != 0">
                    <el-input v-model="ruleForm.synergetic_surname" placeholder="请输入协同人员姓名"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" :prop="(ruleForm.issynergetic_surname === 1) || (ruleForm.issynergetic_surname ===0) ? '' : 'sunergetic_tel'" :label-width="formLabelWidth" v-show="ruleForm.issynergetic_surname != 0">
                    <el-input v-model="ruleForm.sunergetic_tel" placeholder="请输入协同人员手机号码"></el-input>
                </el-form-item>
                <el-form-item label="地点" :prop="(ruleForm.isplace === 1) || (ruleForm.isplace === 0) ? '' : 'place'" :label-width="formLabelWidth" v-show="ruleForm.isplace != 0">
                    <el-select v-model="ruleForm.place" placeholder="请选择地点" @change="placeChange" clearable @clear="placeClear" style="width: 100%;">
                        <el-option
                                v-for="item in ruleForm.Allplace"
                                :label="item.place_address"
                                :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="场次日期" :prop="(ruleForm.issessionDate === 1) || (ruleForm.issessionDate ===0) ? '' : 'sessionDate'" :label-width="formLabelWidth" v-show="ruleForm.issessionDate != 0">
                    <el-select v-model="ruleForm.sessionDate" placeholder="请选择场次日期"  style="width: 100%;">
                        <el-option
                                v-for="item in ruleForm.AllsessionDate"
                                :label="item.disabled === true ? item.place_date + ' (已满)' : item.place_date"
                                :key="item.id"
                                :disabled="item.disabled"
                                :value="item.place_date"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="意向车型" :prop="(ruleForm.isinterestedModels === 1) || (ruleForm.isinterestedModels ===0) ? '' : 'interestedModels'" :label-width="formLabelWidth" v-show="ruleForm.isinterestedModels != 0">
                    <el-select v-model="ruleForm.interestedModels" clearable placeholder="请选择意向车型"  style="width: 100%;">
                        <el-option v-for="item in interestedCarData" :key="item.car_id" :label="item.car_name" :value="item.car_id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="省" :prop="(ruleForm.isdetailed_address === 1) || (ruleForm.isdetailed_address ===0) ? '' : 'province'" :label-width="formLabelWidth" v-show="ruleForm.isdetailed_address != 0">
                    <el-select v-model="ruleForm.province" placeholder="请选择省份" @change="provinceChange" clearable @clear="provinceClear"  style="width: 100%;">
                        <el-option
                                v-for="item in provincelistdata"
                                :label="item.province_name"
                                :key="item.id"
                                :value="item.pronvince_id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="市" :prop="(ruleForm.isdetailed_address === 1) || (ruleForm.isdetailed_address ===0) ? '' : 'city'" :label-width="formLabelWidth" v-show="ruleForm.isdetailed_address != 0">
                    <el-select v-model="ruleForm.city" placeholder="请选择城市"  style="width: 100%;">
                        <el-option
                                v-for="item in citylistdata"
                                :label="item.city_name"
                                :key="item.id"
                                :value="item.city_id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="详细地址" :prop="(ruleForm.isdetailed_address === 1) || (ruleForm.isdetailed_address ===0) ? '' : 'detailed_address'" :label-width="formLabelWidth" v-show="ruleForm.isdetailed_address != 0">
                    <el-input v-model="ruleForm.detailed_address" placeholder="请输入详细地址"></el-input>
                </el-form-item>

            </el-form>

        </el-scrollbar>
        <p class="data-agree">
            <label>
            <el-checkbox v-model="readagree" name="gender">我已阅读、理解并接受</el-checkbox>
            <a href="javascript:;" @click="popShow()" style="text-decoration:underline;"  class="policy-button">《保时捷中国隐私政策》</a>
            </label>
            <span style="display: inline-block">
                I have read, understood and accepted the
                <a href="javascript:;" @click="popShow()" style="text-decoration:underline;"  class="policy-button">Porsche China Privacy Policy</a>
            </span>
        </p>
        <p class="verification" v-text="this.verification"></p>
        <span slot="footer" class="dialog-footer">
            <el-button type="info" @click="submitMessage('ruleForm')">确认报名</el-button>
        </span>
    </el-dialog>
    <!--新的报名-->
    <!--隐私政策-->
    <el-dialog
            title="隐私政策"
            :visible.sync="PrivacyDialogVisible"
            :close-on-click-modal="false"
            :append-to-body='true'
            :width="ActivityWidth"
            center
            class="privacyDialog">
        <p>
            我已阅读、理解并接受《保时捷中国隐私政策》。鉴于此，本人谨此提供以下授权声明。
            <br/>我同意授权<span style="text-decoration: underline;">保时捷（中国）汽车销售有限公司及其授权经销商（合称“保时捷”）收集和</span>处理我的个人数据,包括个人基本信息、联络信息、人口统计信息、驾驶信息、购买信息、支付信息、评论及通信信息、互动信息、社交媒体平台信息、垂直网站信息，前提是此类收集和处理仅限于<span style="text-decoration: underline;">《保时捷中国隐私政策》（经不时更新的）规定的方式和用途，包括</span>向我提供有关服务、产品、活动和优惠信息。
            <br/>未来，我愿意参加保时捷客户和潜在客户关怀计划，并同意接受来自保时捷的营销内容，以了解有关保时捷的产品、活动和优惠信息。我了解客户和潜在客户关怀计划包括有关车辆、车辆相关服务、其他保时捷产品、活动邀请以及有关满意度和期望调查的定制信息和优惠。
            <br/>除了保时捷根据法律法规或监管要求应当继续收集、处理或保存的信息（例如法定信息），我可以在法律法规规定的范围就个人信息行使我的法定权利，<span style="text-decoration: underline;">但相关法定权利的行使不会影响保时捷之前数据处理以及对法定信息持续处理的合法性。</span>
        </p>
    </el-dialog>
    <!--隐私政策-->
    <el-dialog
            :visible.sync="SuccessDialogVisible"
            :close-on-click-modal="false"
            :append-to-body='true'
            :width="ActivityWidth"
            class="succeedDialog"
            center>
        <div class="succeed-tit">
            <p class="succeed-img"><img :src="require('../common/image/submit2.png')" alt=""></p>
            <p class="succeed-succeed">恭喜你， 报名成功!</p>
        </div>
        <div class="succeed-con">
        <p v-show="signTime != '0'">报名日期:{{timedata(signTime)}}</p>
        <p v-html="sign_tips"></p>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="info"  @click="know()">我已悉知</el-button>
        </span>
    </el-dialog>
    <!--报名成功-->
    <!--申请提交-->
        <el-dialog
                :visible.sync="ApplyDialogVisible"
                :close-on-click-modal="false"
                :append-to-body='true'
                :width="ActivityWidth"
                class="applyDialog"
                center>
                 <div class="succeed-tit">
                     <p class="succeed-img"><img :src="require('../common/image/submit1.png')" alt=""></p>
                     <p class="succeed-succeed">您的申请已提交!</p>
                 </div>

                 <div class="succeed-con">
                 <p v-show="signTime != '0'">报名日期:{{timedata(signTime)}}</p>
                 <p v-html="sign_tips"></p>
                 </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="info"  @click="know()">我已悉知</el-button>
            </span>
        </el-dialog>
    <!--申请提交-->
    <!--取消报名-->
        <el-dialog
                :visible.sync="CancelDialogVisible"
                :close-on-click-modal="false"
                :append-to-body='true'
                :width="ActivityWidth"
                class="cancelDialog"
                center>
             <p class="cancel-con">您正在取消&nbsp;&nbsp;<span>{{this.title}}</span>&nbsp;&nbsp;的预约报名，取消后您的电子邀请函将失效，是否确认继续?</p>
            <span slot="footer" class="dialog-footer cancelFooter">
                <el-button type="info" @click="affirmBtn()">确定</el-button>
                <el-button type="info" @click="cancelBtn()">取消</el-button>
            </span>
        </el-dialog>
    <!--取消报名-->
    <!--成功取消报名-->
    <el-dialog
            :visible.sync="SuccessCancelDialogVisible"
            :close-on-click-modal="false"
            :append-to-body='true'
            :width="ActivityWidth"
            class="succeedCancelDialog"
            center>
        <p>您已成功取消&nbsp;&nbsp;<span>{{this.title}}</span>&nbsp;&nbsp;的预约报名，挚享汇期待与您相约下一次的精彩活动。</p>
        <p><span v-if="this.start_time != null || this.end_time">{{timedata(this.start_time)}}&nbsp;-&nbsp;{{timedata(this.end_time)}}</span></p>
        <span slot="footer" class="dialog-footer cancelFooter">
            <el-button type="info" @click="affirmClose()">关闭</el-button>
        </span>
    </el-dialog>
    <!--成功取消报名-->

</div>
</template>

<script>
import Comment from '@/basecom/commentfm.vue';
import {PORSCHE_HOST} from '../common/js/host';
import {isvalidPhone} from '@/lib/isPhone'
// 定义一个全局的变量，谁用谁知道
var validPhone = (rule, value, callback) => {
    if (!value) {
         callback(new Error('请输入手机号'))
    } else if (!isvalidPhone(value)) {
        callback(new Error('请输入正确的11位手机号码'))
    } else {
        callback()
    }
}
export default {
  components:{
      Comment,
  },
  data(){
    return{
        rules: {
            // 姓
            surname: [
                { required: true, message: '请输入姓', trigger: 'blur' },
                { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur'}
            ],
            // 名
            name: [
                { required: true, message: '请输入名', trigger: 'blur' },
                { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur'}
            ],
            // 验证码
            code: [
                { required: true, message: '请输入验证码', trigger: 'blur' },
                { min: 6, max: 6, message: '长度在 6 个字符', trigger: 'blur'}
            ],
            // 手机号
            tel_phone: [
                { required: false, trigger: 'blur', validator: validPhone }
            ],
            // 地点
            place: [
                { required: true, message: '请选择地点', trigger: 'change' },
            ],
            // 场次日期
            sessionDate: [
                { required: true, message: '请选择场次日期', trigger: 'change' },
            ],
            // 电子邮箱
            email: [
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
            ],
            // 微信号
            wechat_number: [
                { required: true, message: '请输入正确的微信号', trigger: 'blur' },
            ],
            // 协同人员姓名
            synergetic_surname: [
                { required: true, message: '请输入协同人员姓名', trigger: 'blur' },
                { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur' }
            ],
            // 协同人员手机号
            sunergetic_tel: [
                { required: false, trigger: 'blur', validator: validPhone }
            ],
            // 意向车型
            interestedModels: [
                { required: true, message: '请选择意向车型', trigger: 'change' },
            ],
            // 省
            province: [
                { required: true, message: '请选择省份', trigger: 'change' }
            ],
            // 市
            city: [
                { required: true, message: '请选择城市', trigger: 'change' }
            ],
            // 详细地址
            detailed_address: [
                { required: true, message: '请输入详细地址', trigger: 'blur' }
            ]
        },
        // 活动须知
        ActiveDialogVisible: false,
        screenWidth: document.body.clientWidth,
        ActivityWidth: '80%',
        formLabelWidth: '80px',
        // 活动须知
        // 活动报名
        SignUpDialogVisible: false,
        // 隐私政策
        PrivacyDialogVisible: false,
        // 报名成功
        SuccessDialogVisible:false,
        // 申请提交
        ApplyDialogVisible: false,
        // 取消报名
        CancelDialogVisible: false,
        // 成功取消报名
        SuccessCancelDialogVisible: false,
        ruleForm: {
            // 姓
            surname: '',
            // 名
            name: '',
            // 手机号
            tel_phone: '',
            // 验证码
            code: '',
            // 电子邮箱
            email: '',
            isemail: '',
            // 微信号
            wechat_number: '',
            iswechat_number: '',
            // 协同人员姓
            synergetic_surname:'',
            issynergetic_surname: '',
            // 协同人员手机号
            sunergetic_tel: '',
            issunergetic_tel: '',
            //  地点
            place: '',
            isplace: '',
            // 场次日期
            sessionDate: '',
            issessionDate: '',
            // 意向车型
            interestedModels: '',
            isinterestedModels: '',
            // 省份
            province:'',
            isprovince:'',
            // 城市
            city:'',
            iscity:'',
            // 详细地址
            detailed_address:'',
            isdetailed_address:'',
            // 地点
            Allplace: [],
            // 全部场次日期
            AllsessionDate: []
        },
        // 活动报名
      articleId:'',
      fmList:[],
      verification:'',
      num:'',
      id:'',
      type:'',
      content:'',
      picture_path:'',
      title:'',
      address:'',
      start_time:'',
      end_time:'',
        is_start_signup:'',
      applicants:'6447',
      upvote_count:'',
      visit_count:'',
      active:'',
      uuids:'',
      notes:'',
      first_type:'fm',
      second_type:'CONTENT',
      join_status:'',
      upvote_status:'',
      activity_is_end:'',
      PORSCHE_HOST,
      activeId:'',
      registration:'',
      popup_status:'',
      small_title:'',
      maximum:'',
      // 提示信息
      sign_tips:'',
      city:null,
      detailed_address:"",
      read:false,
      readagree:false,
      article_id:"",
      showshiul:false,
      showshengul:false,
      provincelistdata: [],
      citylistdata: [],
      province_id:"",
      province:null,
      show: true,
      count: '',
      timer: null,
      codeValue:"获取验证码",
      ids:"",
      set_join_count:"",
      set_maximum:"",
      //意向车型
      interestedCarData:[],
      signTime:'',

    }
  },
  methods:{
      back(){
          let _this = this;
          _this.$router.push('/offline');
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

      showsheng(){
          this.showshengul = !this.showshengul
          this.showshiul = false
      },
      showshi(){
          this.showshiul = !this.showshiul
          this.showshengul = false
      },
      // 清除地点
      placeClear () {
          this.ruleForm.AllsessionDate = []
          this.ruleForm.sessionDate = ''
      },
      // 通过地点获得场次日期
      placeChange () {
          let _this = this;
          _this.ruleForm.sessionDate = ''
          $.ajax({
              type: 'post',
              url: PORSCHE_HOST + '/member/fm/fmDetailOne',
              data: {
                  article_id: _this.num,
                  member_id: '',
                  pla_id: _this.ruleForm.place
              },
              success: function(res) {
                  if (res.code === "1004") {
                      _this.$router.push('/login');
                      return;
                  }
                  if (res.code === "1001") {
                      console.log(res)
                      _this.ruleForm.AllsessionDate = res.allDate
                  }
                  if (res.code === "1002" || res.code === "1003" || res.code === "1009") {
                      alert(res.message);
                      return false;
                  }
              }
          })
      },
      // 获得省份
      provincedata() {
          let _this = this;
          $.ajax({
              type: 'post',
              url: PORSCHE_HOST + '/member/user/province',
              success: function(res) {

                  if (res.code === "1004") {
                      _this.$router.push('/login');
                      return;
                  }
                  if (res.code === "1001") {
                      console.log(res.data)
                      _this.provincelistdata = res.data
                  }
                  if (res.code === "1002" || res.code === "1003" || res.code === "1009") {
                      alert(res.message);
                      return false;
                  }
              }
          })
      },
      // 清除省份
      provinceClear () {
          this.citylistdata = []
          this.ruleForm.city = ''
      },
      // 改变省份获得城市
      provinceChange () {
          let _this = this;
          _this.ruleForm.city = ''
          if (_this.ruleForm.province) {
              console.log(11111)
              $.ajax({
                  type: 'post',
                  data: {
                      province_id: _this.ruleForm.province
                  },
                  url: PORSCHE_HOST + '/member/user/city',
                  success: function(res) {
                      console.log(res)
                      console.log(11)
                      if (res.code === "1004") {
                          _this.$router.push('/login');
                          return;
                      }
                      if (res.code === "1001") {
                          _this.citylistdata = res.data
                      }
                      if (res.code === "1002" || res.code === "1003" || res.code === "1009") {
                          alert(res.message);
                          return false;
                      }
                  }
              })
          }
      },
      citydatapc(province_id,name) {
          let _this = this;
          $.ajax({
              type: 'post',
              data: {
                  province_id: province_id
              },
              url: PORSCHE_HOST + '/member/user/city',
              success: function(res) {
                  console.log(res)
                  console.log(11)
                  if (res.code === "1004") {
                      _this.$router.push('/login');
                      return;
                  }
                  if (res.code === "1001") {
                      console.log(res.data)
                      _this.citylistdata = res.data
                      _this.province_id = province_id
                      _this.province = name
                      _this.city = "选择城市"
                      _this.showshengul = false
                      _this.showshiul = true

                  }
                  if (res.code === "1002" || res.code === "1003" || res.code === "1009") {
                      alert(res.message);
                      return false;
                  }
              }
          })
      },
      chenshipc(id,name){
          console.log(id+"---"+name)
          this.city_id = id
          this.city = name
          this.showshiul = false
      },
      //意向车型
      interestedCar(){
        let _this = this;
        $.ajax({
          type: 'post',
          url: PORSCHE_HOST + '/member/user/car',
          success: function(res) {
            if (res.code === "1004") {
              _this.$router.push('/login');
              return;
            }
            if (res.code === "1001") {
              console.log(res.data)
              _this.interestedCarData = res.data
            }
            if (res.code === "1002" || res.code === "1003" || res.code === "1009") {
              alert(res.message);
              return false;
            }
          }
        })
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
                      _this.ids = res.data.article.id
                      _this.start_time = res.data.article.start_time
                      _this.end_time = res.data.article.end_time
                      //_this.address = res.data.article.address
                      _this.city = res.data.article.city
                      _this.small_title = res.data.article.small_title
                      _this.maximum = res.data.article.maximum
                      _this.picture_path = res.data.article.picture_path
                      _this.title = res.data.article.title
                      _this.is_start_signup = res.data.article.is_start_signup
                      _this.first_type = res.data.article.first_type
                      _this.second_type = res.data.article.second_type
                      _this.content = res.data.article.content
                      _this.applicants = res.data.article.join_count
                      _this.upvote_count = res.data.article.upvote_count
                      _this.active = res.data.article.active
                      _this.visit_count = res.data.article.visit_count
                      _this.popup_status = res.data.article.popup_status
                      _this.set_join_count = res.data.article.set_join_count
                      _this.set_maximum = res.data.article.set_maximum
                      _this.notes = res.data.article.notes
                      _this.sign_tips = res.data.article.sign_tips
                      _this.activeId = res.data.article.id
                      _this.join_status = res.data.join_status
                      _this.upvote_status = res.data.upvote_status
                      _this.activity_is_end = res.data.activity_is_end
                      _this.registration = res.data.registration
                      _this.uuids = res.data.jingcai ? res.data.jingcai.uuid : ''
                      // 全部地点字段
                      _this.ruleForm.Allplace = res.placeArr
                      // 判断是否显示的字段
                      // 地点
                      _this.ruleForm.isplace = res.data.article.place
                      // 场次日期
                      _this.ruleForm.issessionDate = res.data.article.field_date
                      // email
                      _this.ruleForm.isemail = res.data.article.email
                      // 微信号
                      _this.ruleForm.iswechat_number = res.data.article.wechat_number
                      // 协同姓
                      _this.ruleForm.issynergetic_surname = res.data.article.personnel_surname
                      // 协同人手机号
                      _this.ruleForm.issunergetic_tel = res.data.article.personnel_phone
                      // 意向车型
                      _this.ruleForm.isinterestedModels = res.data.article.intentional_vehicle
                      // 详细地址
                      _this.ruleForm.isdetailed_address = res.data.article.mailing_address


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
      //报名状态
      applyQuota(){
          let _this = this;
          _this.verification = ''
            console.log(_this.registration)
          if(_this.registration == '正在报名' && _this.is_start_signup == '1'){
                if(_this.second_type == "OFFLINESELF" || _this.second_type == "OFFLINENONEED" || _this.second_type== "OFFLINENEED"){
                    //报名须知显示
                    _this.ActiveDialogVisible = true;
                }else{
                    //  活动报名显示
                    _this.SignUpDialogVisible = true;
                    // 获取报名人员信息
                    _this.getinfomation();
                }
          }else if(_this.registration == '取消报名'){
              // 取消报名显示
              _this.CancelDialogVisible = true;
          }else if(_this.registration == '精彩回顾'){
              _this.$router.push('/gather/'+_this.uuids);
          }else if(_this.registration == '感兴趣' || this.registration == '报名未开始' || this.registration == '报名已结束' || this.registration == '活动已结束'){
              _this.tolike();
          }else if(_this.registration == '正在报名' && _this.is_start_signup == '0'){
              _this.tolike();
          }
      },
      getinfomation(){
          let _this = this;
          $.ajax({
              type: 'post',
              url: PORSCHE_HOST+'/member/fm/registrationdata',
              success: function (res) {
                  if(res.code === "1004") {
                      _this.$router.push('/login');
                      return ;
                  }
                  if(res.code === "1001") {
                      console.log(res.data)
                      _this.ruleForm.surname = res.data.surname
                      _this.ruleForm.name = res.data.firstname
                      _this.ruleForm.tel_phone = res.data.tel
                      _this.ruleForm.email = res.data.email
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
      //即刻上车
      immediately(){
         let _this = this;
          _this.verification = ''
          if( _this.read === false){
              _this.verification = "*请确认活动须知"
            return false;
          }else{
             _this.ActiveDialogVisible = false
             _this.SignUpDialogVisible = true
             _this.read = false;
             _this.verification = " ";
             // 获取报名人员信息
             _this.getinfomation();

          }
      },
      //获取验证码
      getcode(){
          let TIME_COUNT = 60;
          let _this = this;
          for (var m = 0; m < _this.ruleForm.Allplace.length; m++) {
              if (_this.ruleForm.place === _this.ruleForm.Allplace[m].id) {
                  _this.ruleForm.place = _this.ruleForm.Allplace[m].place_address
              }
          }
          $.ajax({
              type: 'post',
              data: {
                  phone_tel:_this.ruleForm.tel_phone,
                  sessionDate: _this.ruleForm.sessionDate,
                  place: _this.ruleForm.place
              },
              url: PORSCHE_HOST+'/member/fm/duanxincode',
              success: function (res) {
                  if(res.code === "1001"){
                      if (!_this.timer) {
                          _this.count = TIME_COUNT;
                          _this.show =  false;
                          _this.timer = setInterval(() => {
                              if (_this.count > 1 && _this.count <= TIME_COUNT) {
                                  _this.count--;
                              } else {
                                  _this.show = true;
                                  clearInterval(_this.timer);
                                  _this.timer = null;
                                  _this.codeValue = "重新获取"
                              }
                          }, 1000)
                      }

                  }
              },
              error: function (res) {
                  console.log("网络连接错误!")
              }
        })
      },
      //确认报名
      submitMessage(formName){
      console.log(11)
          let _this = this;
          _this.$refs[formName].validate((valid) => {
              if (valid) {
                  _this.verification = ''
                  if( _this.readagree === false){
                      _this.verification = "*请先阅读隐私政策"
                      return false;
                  }
                  console.log(_this.provincelistdata)
                  // 把地点id转为汉子
                  for (var m = 0; m < _this.ruleForm.Allplace.length; m++) {
                      if (_this.ruleForm.place === _this.ruleForm.Allplace[m].id) {
                          _this.ruleForm.place = _this.ruleForm.Allplace[m].place_address
                      }
                  }
                  // 把省份id转为汉子
                  for (var i = 0; i < _this.provincelistdata.length; i++) {
                      if (_this.ruleForm.province === _this.provincelistdata[i].pronvince_id) {
                          _this.ruleForm.province = _this.provincelistdata[i].province_name
                      }
                  }

                  // 把城市id转为汉子
                  for (var j = 0; j< _this.citylistdata.length; j++) {
                      if (_this.ruleForm.city === _this.citylistdata[j].city_id) {
                          _this.ruleForm.city = _this.citylistdata[j].city_name
                      }
                  }
                  $.ajax({
                      type: 'post',
                      data: {
                          active_name: _this.title,
                          // 姓
                          surname:_this.ruleForm.surname,
                          // 名
                          name:_this.ruleForm.name,
                          // 地点
                          place: _this.ruleForm.place,
                          // 场次日期
                          sessionDate: new Date(_this.ruleForm.sessionDate).getTime().toString() != 'NaN' ? new Date(_this.ruleForm.sessionDate).getTime().toString() : '0',
                          // 微信号
                          wechat_number: _this.ruleForm.wechat_number,
                          // 手机号
                          tel_phone:_this.ruleForm.tel_phone,
                          // 邮箱
                          email:_this.ruleForm.email,
                          // 验证码
                          code:_this.ruleForm.code,
                          // 协同人姓名
                          synergetic_surname:_this.ruleForm.synergetic_surname,
                          // 协同手机号
                          sunergetic_tel:_this.ruleForm.sunergetic_tel,
                          // 意向车型
                          interestedModels: _this.ruleForm.interestedModels,
                          // 省份
                          province:_this.ruleForm.province,
                          // 城市
                          city:_this.ruleForm.city,
                          // 地址
                          detailed_address:_this.ruleForm.detailed_address,
                          // id
                          article_id:_this.num
                      },
                      url: PORSCHE_HOST+'/member/fm/registration',
                      success: function (res) {
                          console.log(22)
                          if(res.code === "1001"){
                              _this.readagree = false;
                              _this.verification = " ";
                              _this.ruleForm.code = "";
                              _this.ruleForm.synergetic_surname = "";
                              _this.ruleForm.sunergetic_tel ="";
                              _this.ruleForm.province = "";
                              _this.ruleForm.city = "";
                              _this.ruleForm.detailed_address ="";
                              _this.show = true;
                              _this.codeValue = "获取验证码"
                              _this.SignUpDialogVisible = false;
                              //报名时间
                              _this.signTime = parseInt(res.created_time);
                              if(_this.popup_status === "apply"){
                                  _this.SuccessDialogVisible = true
                              }else if(_this.popup_status === 'submit'){
                                  _this.ApplyDialogVisible = true
                              }
                              _this.sendNew()

                          }
                          if(res.code === "1002" || res.code === "1003" || res.code === "1009") {
                              _this.verification = '*'+res.message;
                              return false;
                          }
                      },
                      error: function (res) {
                          console.log("网络连接错误!")
                      }
                  });
              } else {
                  _this.verification = '＊为必填项，请确保选择场次及意向车型后提交'
                  console.log('error submit!!');
                  console.log('为什么不出来');
                  return false;
              }
          })
      },
      //隐私政策
      popShow(){
          this.PrivacyDialogVisible = true;
      },
      //我已知悉
      know(){
          let _this = this;
          _this.SuccessDialogVisible = false;
          _this.ApplyDialogVisible = false;
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
                      _this.registration = "取消报名"
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
      //发送消息
      sendNew(){
          let _this = this;
          $.ajax({
              type: 'post',
              data: {
                  tel_phone:_this.ruleForm.tel_phone,
                  active_name: _this.title,
                  date_time: _this.signTime ? _this.timedata(_this.signTime) : ''
              },
              url: PORSCHE_HOST+'/member/fm/duanxinjiekou',
              success: function (res) {
                  if(res.code === "1004") {
                      _this.$router.push('/login');
                      return ;
                  }
                  if(res.code === "1001") {
                    console.log(11)
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
      //取消报名确定按钮
      affirmBtn(){
          let _this = this;
          _this.CancelDialogVisible = false
          _this.SuccessCancelDialogVisible = true
      },
      //取消报名取消按钮
      cancelBtn(){
          let _this = this;
          _this.CancelDialogVisible = false
      },
      //取消报名关闭按钮
      affirmClose(){
          let _this = this;
          $.ajax({
              type: 'post',
              data: {
                  article_id:_this.num
              },
              url: PORSCHE_HOST+'/member/fm/noapply',
              success: function (res) {
                  if(res.code === "1004") {
                      _this.$router.push('/login');
                      return ;
                  }
                  if(res.code === "1001") {
                      _this.registration = "正在报名"
                      _this.SuccessCancelDialogVisible = false
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
        },

      // 检验屏幕的宽度
      isClientWidth () {
          const that = this
          if (document.body.clientWidth <= 768) {
              this.ActivityWidth = '80%'
          } else {
              this.ActivityWidth = '40%'
          }
          window.onresize = () => {
              return (() => {
                  window.screenWidth = document.body.clientWidth
                  that.screenWidth = window.screenWidth })()
          }
      }

  },
  watch: {
      screenWidth (val) {
          if(val <= 768){
              this.ActivityWidth = '80%'
          }else{
              this.ActivityWidth = '40%'
          }
      }
  },
  mounted(){
      this.isClientWidth()
      this.num = this.$route.params.num
      this.articleId = this.$route.params.num
      this.tofmdetail();
      this.setVisiturl()
      this.provincedata()
      this.interestedCar()

      console.log(this.screenWidth)
  },
  created() {
    this.articleId = this.$route.params.num
  }
}
</script>

<style scoped>
    .span-select-nr ul{
        max-height: 80px;
        overflow-y: scroll!important;
    }
    .span-select-nr ul li{
        height: 26px!important;
        line-height: 26px!important;
        border-bottom: 0px !important;
        padding: 6px;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-user-select: none;
        color: #000;
    }
    .span-select-nr ul li:hover{
        background-color: #d5001c!important;
        color: #fff;
    }
    .select2-selection__arrow b {
        border-color: #888 transparent transparent;
        border-style: solid;
        border-width: 5px 4px 0;
        height: 0;
        left: 50%;
        margin-left: -4px;
        margin-top: -2px;
        position: absolute;
        top: 50%;
        width: 0;
    }
    /*滚动条样式*/
    .rollingBox{
        height: 200px;
        overflow-y:scroll;
        -webkit-overflow-scrolling:touch;
        overflow-x:hidden;
    }
    .rollingBox::-webkit-scrollbar{/*滚动条整体样式*/
        width: 2px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 2px;
    }
    .rollingBox::-webkit-scrollbar-thumb{/*滚动条里面小方块*/
        border-radius: 2px;
        -webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.2);
        background: rgba(0,0,0,0.2);
    }
    .rollingBox::-webkit-scrollbar-track{/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.2);
        border-radius: 0;
        background: rgba(0,0,0,0.1);
    }


    /*日历图标*/
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

    input[type=checkbox]:checked:after,
    input[type=radio]:checked:after {
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
        position: absolute;
        top: 2px;
        left: 1px;
        display: table;
        width: 8px;
        height: 4px;
        border: 1px solid red;
        border-top: 0;
        border-right: 0;
        content: '';
    }

    .main-kv .register-form .row-radio-gender input {
        margin-right: 5px;
    }

    input[type=checkbox]:checked,
    input[type=radio]:checked {
        border-width: 1px;
        background-color: #fff;
    }

    input[type=checkbox],
    input[type=radio] {
        background-color: #fff;
        -moz-appearance: none;
        appearance: none;
        border: 1px solid #000;
        width: 14px;
        height: 14px;
        border-radius: 0;
        position: relative;
        vertical-align: middle;
        outline: none;
        -webkit-appearance: none;
    }
    .forecast-agree label {
        margin-right: 5px;
    }
    .forecast-con p{
        line-height: 20px;
    }
    .forecast-explain{
        font-size: 12px;
        line-height: 20px;
        border-bottom: 2px solid #b5b4ba;
    }




    .data-data{
        line-height: 20px;
    }

    .form-table td input[type=tel],
    .form-table td input[type=text] {
        font-size: 12px;
        width: 100%;
        height: 34px;
        line-height: 34px;
        border: 0 none;
        outline: none;
        box-sizing: border-box;
        text-indent: 5px;
    }


    .form-table td {
        border: 1px solid #989898;
        height: 34px;
        line-height: 34px;
        text-align: center;
        overflow: hidden;
        /*position: relative;*/
    }



    .form-table td {
        border: 1px solid #989898;
        height: 34px;
        text-align: center;
        overflow: hidden;
        position: relative;
    }
    .getcode,
    .getcode:hover{
        position: absolute !important;
        right: 0px !important;
        width: 65px !important;
        height: 28px !important;
        color: #fff !important;
        background: #313639 !important;
        top: 1px !important;
        cursor: pointer !important;
        border:none  !important;
    }


    .popShow-nrtext h2{
        text-align: center;
        font-size: 30px;
        margin:30px 0px 0px;
        color: #000;
        cursor: pointer;
    }
    .popShow-nrtext p{
        line-height: 25px;
        font-size: 12px;
        margin-bottom: 30px;
        color: #000;
    }
    .popShow-nrtext h3{
        font-size: 15px;
        text-align: center;
        margin-bottom: 30px;
        color: #000;
    }
    .succeed-tit{
        margin: 20px 0px;
    }
    .succeed-img img{
        display: block;
        margin: 0 auto 20px;
        width: 50px;
        height: 50px;
    }
    .succeed-succeed{
        text-align: center;
        font-size: 16px;
    }
    .succeed-con{
        height: 170px;
        margin: 10px 0;

    }
    .succeed-con p{
        line-height: 20px;
    }
    /* 取消报名*/


    .cancel-con{
        padding: 40px 0;
    }
    .cancel-btn p{
        height: 60px;
        color: #fff;
    }



    .cancel-btns p{
        height: 60px;
        color: #fff;
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
    .parsche-offline-navigation {
        width: 100%;
        /*overflow: hidden;*/
        height: auto;
        position: relative;
    }
    .parsche-offline-navigation ul{
        display: flex;
        margin: 0px!important;
        cursor: pointer;
        background: #eff0f1;
    }

    .parsche-offline-navigation ul li{
        width: 46.5%;
        height: 55px;
        line-height: 55px;
        text-align: center;
        cursor: pointer;
    }
    .parsche-offline-navigation ul li a{
        display: block;
        cursor: pointer;
    }

    .parsche-offline-navigation ul li span{
        position: relative;
        top: -55px;
        color: #fff;
        cursor: pointer;
    }

    .parsche-offline-navigation ul li:last-child span{
        position: relative;
        top: -55px;
        color: #000;
        cursor: pointer;
    }

    .navigation1 {
        border-bottom: 55px solid #950014;
        border-right: 20px solid #950014;
        border-left: 55px solid #950014;

    }
    .navigation2 {
        border-top: 55px solid #eff0f1;
        border-right: 55px solid #eff0f1;
        border-left: 55px solid #eff0f1;
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
    .articleapp-left-a {}
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
    /*日历*/
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

    input[type=checkbox]:checked:after,
    input[type=radio]:checked:after {
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
        position: absolute;
        top: 2px;
        left: 1px;
        display: table;
        width: 8px;
        height: 4px;
        border: 1px solid red;
        border-top: 0;
        border-right: 0;
        content: '';
    }

    .main-kv .register-form .row-radio-gender input {
        margin-right: 5px;
    }

    input[type=checkbox]:checked,
    input[type=radio]:checked {
        border-width: 1px;
        background-color: #fff;
    }

    input[type=checkbox],
    input[type=radio] {
        background-color: #fff;
        -moz-appearance: none;
        appearance: none;
        border: 1px solid #000;
        width: 14px;
        height: 14px;
        border-radius: 0;
        position: relative;
        vertical-align: middle;
        outline: none;
        -webkit-appearance: none;
    }
    .forecast-agree label {
        margin-right: 5px;
    }

    .forecast-con p{
        line-height: 20px;
    }
    .forecast-explain{
        font-size: 12px;
        line-height: 20px;
        border-bottom: 2px solid #b5b4ba;
    }



    .form-table td input[type=tel],
    .form-table td input[type=text] {
        font-size: 12px;
        width: 100%;
        height: 34px;
        line-height: 34px;
        border: 0 none;
        outline: none;
        box-sizing: border-box;
        text-indent: 5px;
    }


    .form-table td {
        border: 1px solid #989898;
        height: 34px;
        line-height: 34px;
        text-align: center;
        overflow: hidden;
        /*position: relative;*/
    }


    .form-table td {
        border: 1px solid #989898;
        height: 34px;
        text-align: center;
        overflow: hidden;
        position: relative;
    }
    .data-agree{
        border-top:2px solid #ccc !important;
        line-height:35px !important;
    }

    .popShow-nrtext h2{
        text-align: center;
        font-size: 30px;
        margin:30px 0px 0px;
        color: #000;
        cursor: pointer;
    }
    .popShow-nrtext p{
        line-height: 25px;
        font-size: 12px;
        margin-bottom: 30px;
        color: #000;
    }
    .popShow-nrtext h3{
        font-size: 15px;
        text-align: center;
        margin-bottom: 30px;
        color: #000;
    }

    .succeed-tit{
        margin: 20px 0px;
    }
    .succeed-img img{
        display: block;
        margin: 0 auto 20px;
        width: 50px;
        height: 50px;
    }
    .succeed-succeed{
        text-align: center;
        font-size: 16px;
    }
    .succeed-con{
        height: 170px;
        margin: 10px 0;

    }
    .succeed-con p{
        line-height: 20px;
    }


    .cancel-con{
        padding: 40px 0;
    }
    .cancel-btn p{
        height: 60px;
        color: #fff;
    }

    .cancel-btns p{
        height: 60px;
        color: #fff;
    }


}
</style>
