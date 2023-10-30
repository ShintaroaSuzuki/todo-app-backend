# todo-app-backend

## 目次

-   [環境構築](#setup-env)
-   [開発サーバーの起動](#start-dev)
-   [ローカルコンテナでの起動](#start-container)
-   [PlanetScale の環境構築](#setup-planetscale)
-   [Google Cloud CLI の設定](#setup-gcp-cli)
-   [GitHub CLI の設定](#setup-github-cli)

<h2 id="setup-env">環境構築</h2>

```
$ yarn install
```

<h2 id="start-dev">開発サーバーの起動</h2>

### MySQL サーバーの準備

```
$ docker compose up mysql-server -d
$ npx prisma migrate dev
$ npx prisma db seed
```

### API サーバーの起動

```
$ yarn start
```

### MySQL サーバーの終了

```
$ docker compose down --rmi all
```

<h2 id="start-container">ローカルコンテナでの起動</h2>

```
$ docker compose up -d
$ npx prisma migrate deploy
```

<h2 id="setup-planetscale">PlanetScale の環境構築</h2>

```
$ brew install "planetscale/tap/pscale"
$ pscale auth login
$ pscale region list # 利用できるリージョンの確認
$ pscale database create todo_app --plan hobby --region ap-northeast
$ pscale password create todo_app main init-password
# DATABASE_URL は下記
# mysql://<USERNAME>:<PLAIN_TEXT_PASSWORD>@<ACCESS_HOST_URL>/todo_app?sslaccept=strict
<!-- $ npx prisma migrate deploy -->
```

<h2 id="setup-gcp-cli">Google Cloud CLI の設定</h2>

```
$ docker pull google/cloud-sdk:latest
$ docker run -ti google/cloud-sdk:latest gcloud version
$ docker run -ti --name gcloud-config google/cloud-sdk gcloud auth login
$ alias gcloud='docker run --rm -it --volumes-from gcloud-config google/cloud-sdk gcloud'
```

#### 請求先アカウント ID の確認

```
$ gcloud billing accounts list
```

<h2 id="setup-github-cli">GitHub CLI の設定</h2>

```
$ brew install gh
# 下記のコマンドは任意。自分の環境ではなぜか unset GITHUB_TOKEN をしてもエラーが出るのでエイリアスを追加した。
$ alias gh='env -u GITHUB_TOKEN gh'
$ gh auth login
```
