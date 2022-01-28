# animeflv_scripts

Scripts to create a list of download links for animeflv anime series

Copy / Paste index.js content to the console of animeflv browser tab. Then use **getDownloadLinks** function.

**Example of One Piece links download**

```
/*
Download links of 60 episodes starting from episode 947 (included)
*/

getDownloadLinks("https://www3.animeflv.net/ver/one-piece-tv-", 947, 60)
```

Previous code snippet generated a download of a file named **_links.txt_**
