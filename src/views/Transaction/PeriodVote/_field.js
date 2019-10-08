export default {
    data : [
        {
            id:'data_candidat', type:'info', label:'Master Candidat', hidden: 'no',
            child: [
                {id:'id', content_text: 'text', type:'text', label:'Id', hidden: 'yes'},
                {id:'period_id', content_text: 'text', type:'text_id', label:'Id Period', hidden: 'yes'},
                {id:'name', content_text: 'text', type:'text', label:'Nama Pemungutan', hidden: 'no'},
                {id:'description', content_text: 'text', type:'text', label:'Deskripsi', hidden: 'no'},
            ]
        }
    ]
}