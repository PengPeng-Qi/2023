# git log

这一期讲一讲 `git log` 的图怎么看

## 例 1 🌰

```shell
git log

commit xxxxxx (HEAD -> main, origin/main, origin/HEAD)
```

- `HEAD` 表示当前分支为 `main`
- `origin/main` 表示远程的 `main` 分支在当前 `commit xxxxxx`
- `origin/HEAD` 表示远程分支的 `HEAD` 在当前 `commit xxxxxx`

## 例 2 🌰

```shell
git log

commit xx1 (HEAD -> feature-xx1, origin/feature-xx1)

commit xx2 (origin/master, origin/HEAD, master)
```

- `HEAD` 表示当前分支为 `feature-xx1`
- `origin/feature-xx1` 表示远程分支 `feature-xx1` 在当前 `commit xx1`
-
- `origin/master` 表示远程的 `master` 分支在 `commit xx2`
- `origin/HEAD` 表示远程分支的 `HEAD` 在 `commit xx2`
- `master` 表示分支 `master` 在 `commit xx2`
