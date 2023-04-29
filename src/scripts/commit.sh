#!/bin/sh

TAGARR=("build"
        "chore"
        "ci"
        "docs"
        "feat"
        "fix"
        "perf"
        "refactor"
        "revert"
        "style"
        "test")

CUSTOMTAG=''

for tag in "${TAGARR[@]}"
do
    if [ "$tag" == "${TAGARR[-1]}" ]; then
    CUSTOMTAG+="\"$tag\""
else
    CUSTOMTAG+="\"$tag\", "
fi
done

HELPHELPER="[--h] -- script to make commit operations faster"
LISTHELPER="[--list] -- display the names of all the allowed commit tags"

MESSAGEHELPER="[-m] -- commit message"
TAGHELPER="[-t] -- tag to pass ($CUSTOMTAG)"
BRANCHAPPENDHELPER="[-a] -- [OPTIONAL] string to pass when you need to extend the default branch name provided"

HELPERARR=("$(basename "$0")" "Usage:" "$HELPHELPER" "$LISTHELPER" "$TAGHELPER" "$MESSAGEHELPER" "$BRANCHAPPENDHELPER")

if [ $1 == "--h" ] || [ $1 == "--help" ]; then
    for helper in "${HELPERARR[@]}"
    do
        echo -e "$helper"
    done
    exit 0
fi

if [ $1 == "--list" ]; then
    echo -e "Available tags are:\n[$CUSTOMTAG]"
    exit 0
fi


if [ $# -gt 6 ]; then
    echo "[ERR]: More parameters than expected were provided (MAX 3)... Aborting..."
    exit 1
fi


while getopts "t:m:a" arg; do
    case $arg in
        t) TAG=$OPTARG;;
    esac
    case $arg in
        m) COMMITMSG=$OPTARG;;
    esac
    case $arg in
        a) BRANCHAPPEND=$OPTARG;;
    esac
done


BRANCHNAME=`git branch | grep \* | awk '{print \$2}'`

if [ -z ${TAG} ]; then
    echo "[ERR]: Tag name is missing .. Aborting..."
    exit 1
fi

if [[ ! " ${TAGARR[*]} " =~ " ${TAG} " ]]; then
    echo "[ERR]: Tag name wrong... Aborting..."
    exit 1
fi

if [ -z "${COMMITMSG}" ]; then
        echo "[ERR]: Commit message missing... Aborting..."
        exit 1
fi

if [ ! -z "${BRANCHAPPEND}" ]; then
        BRANCHNAME="$BRANCHNAME-$BRANCHAPPEND"
fi


COMMIT="$TAG:$BRANCHNAME $COMMITMSG";

echo "Commit message is: [$COMMIT]"


while true; do
    read -p "Do you want to commit using this message? y/n " yn
    case $yn in
        [Yy]* )
        git commit -m "$COMMIT"
        COMMITCMD="git commit -m $COMMIT";
        echo "Committed using the command: $COMMITCMD"
        break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done