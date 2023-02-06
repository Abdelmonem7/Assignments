

var siteNameInput=document.getElementById('siteName');
var siteUrlInput=document.getElementById('siteUrl');

var sitesContainer=[];



if(localStorage.getItem('sites')!=null){

sitesContainer=JSON.parse(localStorage.getItem('sites'))
displaySites(sitesContainer);

}
function submit()
{



    if(validateSites()==true)
    {
        var sites={
            name:siteNameInput.value,
            url:siteUrlInput.value,
                }
        sitesContainer.push(sites);
        localStorage.setItem("sites",JSON.stringify(sitesContainer));
        displaySites(sitesContainer);
        clearForm();
        
    }
    else if(validateSites()==2){
        nameError.classList.replace('d-none','d-block');      
    }
    else if(validateSites()==3){
        
        urlError.classList.replace('d-none','d-block');
    }

    else{
        nameError.classList.replace('d-none','d-block');
        urlError.classList.replace('d-none','d-block');
    }



}


function displaySites(arr)
{

var cartona=``;

for(var i=0;i< arr.length;i++)
{
cartona+=
`
<tr>
<td class="fs-3 py-4">${arr[i].name}</td>
<td><a class="btn btn-primary" href="${arr[i].url}" target="_blank">visit</a></td>
<td><button  onclick="deleteSites(${i});" class="btn btn-danger btndelete">Delete</button></td>
</tr>
`;
}

document.getElementById('tableBody').innerHTML=cartona;
}

function clearForm()
{
siteNameInput.value="";
siteUrlInput.value="";
nameError.classList.replace('d-block','d-none');
urlError.classList.replace('d-block','d-none');
}

function deleteSites(siteIndex)
{

    sitesContainer.splice(siteIndex,1);
    localStorage.setItem("sites",JSON.stringify(sitesContainer))
    displaySites(sitesContainer);


}



function validateSites()
{
var regexName=/[A-Za-z]{5,}/;
var regexUrl=/^(http|https):\/\/[A-z.a-z]{7,}/;

if(regexName.test(siteNameInput.value)==true && regexUrl.test(siteUrlInput.value)==true) {
return true;
}  
else if(regexName.test(siteNameInput.value)==false && regexUrl.test(siteUrlInput.value)==true){
    return 2;
}
else if(regexName.test(siteNameInput.value)==true &&regexUrl.test(siteUrlInput.value)==false){
    return 3;
}
else{
    return false;
}

}

