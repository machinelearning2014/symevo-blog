# Remote blog publishing

SYMEVO keeps blog authoring source and generated GitHub Pages output in the
public `machinelearning2014/symevo-blog` repository. The runtime repository has
no `blog/` working tree.

The `blog_post` tool reads `_source/blog/**` from `symevo-blog/main` into an
isolated temporary directory for every action. `create` and `update` commit a
draft source revision without rebuilding the public site. `publish` changes the
selected temporary post to `draft: false`, validates the complete site with
`scripts/build-blog.mjs`, and commits both the generated site and source archive
in one GitHub tree update. Branch advancement uses a non-force update, so a
concurrent writer causes the operation to fail rather than overwrite work.

`list` and `read` need network access but can read the public repository without
a token. `create`, `update`, and `publish` require `GITHUB_TOKEN` with
**Contents: Read and write** access to `machinelearning2014/symevo-blog`.
Publication additionally requires an explicit user publication request,
terminal CODE publication authority, and `confirm=true`.

GitHub Pages should be configured in `machinelearning2014/symevo-blog` to deploy
from the `main` branch and `/ (root)`. Authoring inputs are archived under
`_source/blog/`; the builder snapshot is stored at
`_source/scripts/build-blog.mjs`.
