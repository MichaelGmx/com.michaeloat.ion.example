[官方Doc](https://docs.microsoft.com/en-us/appcenter/distribution/codepush/cli)

#### 发布 更新（Releasing Updates）
```npm
appcenter codepush release -a <ownerName>/<appName> -c <updateContentsPath> -t <targetBinaryVersion> -d <deploymentName>

[-t|--target-binary-version <version>]
[-с|--update-contents-path <updateContentsPath>]
[-r|--rollout <rolloutPercentage>]
[--disable-duplicate-release-error]
[-k|--private-key-path <privateKeyPath>]
[-m|--mandatory]
[-x|--disabled]
[--description <description>]
[-d|--deployment-name <deploymentName>]
[-a|--app <ownerName>/<appName>]
[--disable-telemetry]
[-v|--version]
```
例子：发布至 Staging环境
```npm
appcenter codepush release-cordova -a MichaelGmx/com.michaeloat.ion.example -d Staging
```

#### 回滚 更新（Rolling Back Updates）
```npm
appcenter codepush rollback <ownerName>/<appName> <deploymentName>
appcenter codepush rollback -a <ownerName>/MyApp-iOS Production
```
回滚至特定版本
```npm
appcenter codepush rollback -a <ownerName>/MyApp-iOS Production --target-release v34
```