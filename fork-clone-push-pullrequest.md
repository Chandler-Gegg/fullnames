fork-clone-push-pullrequest.md
# Clicked fork button on Chandler-Gegg/fullnames

git clone https://github.com/psons/fullnames.git

cd fullnames/

git branch

pwd

git checkout -b environment-setup

echo pull me > aFile

git add --all

git status

git commit -m "afile with pullme in it"

git push origin environment-setup

# after this I did a pull request.

# selected the environment-setup branch from the branch button drop down

# clicked the "New pull request" button

# Gitub navigated me to a tab in your repository labled "Pull Requests"
##  a little lower on the page it shows" 	
psons wants to merge 1 commit into Chandler-Gegg:environment-setup from psons:environment-setup

git log --oneline

git diff cbc70b2

---

$ git log --oneline

f62a655 (HEAD -> environment-setup, origin/environment-setup) afile with pullme in it

cbc70b2 (origin/master, origin/HEAD, master) init commit

$ git diff cbc70b2


diff --git a/aFile b/aFile

new file mode 100644

index 0000000..596428d

--- /dev/null

+++ b/aFile

@@ -0,0 +1 @@

+pull me
