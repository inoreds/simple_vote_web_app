export default {
    data : [
        {
            id:'data_candidat', type:'info', label:'Master Candidat', hidden: 'no',
            child: [
                {id:'id', content_text: 'text', type:'text', label:'Id', hidden: 'yes'},
                {id:'nama_lengkap', content_text: 'text', type:'text', label:'Nama Lengkap', hidden: 'no'}, 
                {id:'tempat_lahir', content_text: 'text', type:'text', label:'Tempat Lahir', hidden: 'no'}, 
                {id:'tgl_lahir', content_text: 'text', type:'date', label:'Tgl. Lahir', hidden: 'no'}, 
                { 
                    id:'jenis_kelamin', content_text: 'text', 
                    type:'select_box_static', 
                    label:'Jenis Kelamin', 
                    hidden: 'no', 
                    property:['LAKI-LAKI', 'PEREMPUAN'], 
                    value:['LAKI-LAKI', 'PEREMPUAN'], 
                },
                {id:'alamat', content_text: 'text', type:'text', label:'Alamat', hidden: 'no'}, 
                {id:'no_ktp', content_text: 'text', type:'text', label:'No KTP', hidden: 'no'}, 
                // {id:'pas_foto', content_text: 'text', type:'file', label:'Pas Foto', hidden: 'no'}, 
                // {id:'ktp', content_text: 'text', type:'file', label:'Foto KTP', hidden: 'no'}, 
                { 
                    id:'agama', content_text: 'text', 
                    type:'select_box_static', 
                    label:'Agama', 
                    hidden: 'no', 
                    property:['ISLAM', 'KRISTEN', 'KATOLIK', 'HINDU', 'BUDHA'], 
                    value:['ISLAM', 'KRISTEN', 'KATOLIK', 'HINDU', 'BUDHA']
                },
                {id:'pekerjaan', content_text: 'text', type:'text', label:'Pekerjaan', hidden: 'no'}, 
                { 
                    id:'warga_negara', content_text: 'text', 
                    type:'combobox_static', 
                    label:'Warga Negara', 
                    hidden: 'no', 
                    property:['WNI (Indonesia)', 'WNA (Asing)'], 
                    value:['WNI (Indonesia)', 'WNA (Asing)']
                },
 
            ]
        }
    ]
}