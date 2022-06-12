<script setup lang="ts"></script>

<template>
  <main>
    <div>
      <p>ゴール SPAでECサイトを作成してみる。(余裕があれば多言語化 vue-i18n)</p>
      <p>ページ一覧</p>
      <p>ログイン画面(ログアウト機能実装)</p>
      <p>商品一覧画面</p>
      <p>商品管理画面</p>
      <p>決済画面(住所入力等 vee-validateの練習?)</p>
      <p>決済完了画面(トップページに戻る)</p>
      <p>
        (ユーザー登録、カート画面や商品詳細ページなどは余裕があれば実装?
        在庫管理はDB連携して行ってもらう)
      </p>
      <p>進め方</p>
      <p>0.docker環境構築(余裕があったら？)</p>
      <p>1.vueを起動してhello world</p>
      <p>2.対象ページ作成(DB連携なしで画面遷移のみ)</p>
      <p>3.DBと連携してECサイトを作成してみる</p>
      <p>3.1テーブル設計</p>
      <p>4.jestでテストしながら考慮不足やバグを修正する</p>
      <p>5.tailwindで画面をカスタマイズしてみる その他</p>
      <p>ビルドはvite、DBとの連携はhasura</p>
      <p>DB連携箇所 ユーザー管理 商品在庫管理</p>
      <p></p>
    </div>
    <br />
    <hr />
    <br />
    <div>
      <p>## 実行ライブラリ -</p>
      <p>- TypeScript</p>
      <p>- Vue.js(v3)</p>
      <p>- vue-router(画面遷移)</p>
      <p>- vee-validate(バリデーション)</p>
      <p>- vue-i18n(余裕があったら)</p>
      <p>- tailwind</p>
      <p>- graphql</p>
      <p>## 開発ライブラリ</p>
      <p>- storybook(コンポーネント確認)</p>
      <p>- jest(テスト)</p>
      <p>vite(ビルド・実行環境)</p>
    </div>
  </main>
</template>
